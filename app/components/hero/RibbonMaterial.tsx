import * as THREE from "three";

/**
 * Satin ribbon shader material.
 *
 * Two-sided MeshPhysicalMaterial subclass with custom onBeforeCompile to
 * inject:
 *   - vertical fabric gradient (deep -> blush)
 *   - anisotropic-style soft specular streak following the ribbon's
 *     length-direction
 *   - subtle fresnel cooling
 *   - very faint fabric grain
 *
 * Built on MeshPhysicalMaterial so we get correct lighting / tonemapping
 * for free; we only restyle the surface.
 */
export interface SatinMaterialUniforms {
  uTime: { value: number };
  uColor: { value: THREE.Color };
  uColorDeep: { value: THREE.Color };
  uColorBlush: { value: THREE.Color };
}

export const createSatinMaterial = (
  color: string
): THREE.MeshPhysicalMaterial & { uniforms: SatinMaterialUniforms } => {
  const base = new THREE.Color(color);
  const deep = base.clone().multiplyScalar(0.55).lerp(new THREE.Color("#3a1330"), 0.25);
  const blush = base.clone().lerp(new THREE.Color("#fff2f7"), 0.55);

  const uniforms: SatinMaterialUniforms = {
    uTime: { value: 0 },
    uColor: { value: base },
    uColorDeep: { value: deep },
    uColorBlush: { value: blush },
  };

  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.32,
    metalness: 0.0,
    clearcoat: 0.18,
    clearcoatRoughness: 0.55,
    sheen: 0.85,
    sheenColor: blush,
    sheenRoughness: 0.45,
    side: THREE.DoubleSide,
    transparent: false,
  }) as THREE.MeshPhysicalMaterial & { uniforms: SatinMaterialUniforms };

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uColor = uniforms.uColor;
    shader.uniforms.uColorDeep = uniforms.uColorDeep;
    shader.uniforms.uColorBlush = uniforms.uColorBlush;

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `
        #include <common>
        varying vec2 vRibbonUv;
        varying vec3 vRibbonViewDir;
        `
      )
      .replace(
        "#include <uv_vertex>",
        `
        #include <uv_vertex>
        vRibbonUv = uv;
        vec4 _mvp = modelViewMatrix * vec4(position, 1.0);
        vRibbonViewDir = normalize(-_mvp.xyz);
        `
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `
        #include <common>
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uColorDeep;
        uniform vec3 uColorBlush;
        varying vec2 vRibbonUv;
        varying vec3 vRibbonViewDir;
        `
      )
      .replace(
        "#include <color_fragment>",
        `
        #include <color_fragment>

        // vertical fabric gradient across the ribbon's width (uv.y)
        float w = clamp(vRibbonUv.y, 0.0, 1.0);
        vec3 fabric = mix(uColorDeep, uColor, smoothstep(0.0, 0.45, w));
        fabric = mix(fabric, uColorBlush, smoothstep(0.55, 1.0, w));

        // soft anisotropic streak running along the ribbon length (uv.x).
        // We modulate it with view direction so the highlight slides
        // as the ribbon (or camera) moves.
        float along = vRibbonUv.x;
        float view = clamp(vRibbonViewDir.z, 0.0, 1.0);
        float streakCenter = 0.5 + 0.12 * sin(along * 6.2831 + uTime * 0.15);
        float streak = exp(-pow((w - streakCenter) * 5.2, 2.0));
        streak *= 0.55 + 0.45 * view;
        fabric += streak * 0.18 * uColorBlush;

        // fresnel cooling on the very edges
        float fres = pow(1.0 - view, 3.0);
        fabric = mix(fabric, uColorDeep, fres * 0.18);

        // very faint, high-frequency fabric grain - keeps it from looking
        // like plastic. Deterministic, no texture sample.
        float g = fract(sin(dot(vRibbonUv * vec2(420.0, 90.0), vec2(12.9898, 78.233))) * 43758.5453);
        fabric *= 0.985 + g * 0.03;

        diffuseColor.rgb *= fabric;
        `
      );

    material.userData.shader = shader;
  };

  material.uniforms = uniforms;
  material.customProgramCacheKey = () => "whyshy-satin-v1";
  return material;
};
