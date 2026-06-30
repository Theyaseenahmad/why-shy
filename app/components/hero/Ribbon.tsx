"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createControlPoints, stepRibbon } from "./physics";
import { createSatinMaterial } from "./RibbonMaterial";
import { useMouseWorld } from "./useMouseWorld";
import type { RibbonProps } from "./types";

/**
 * The actual ribbon mesh. Owns:
 *   - control points (physics state)
 *   - a CatmullRom curve smoothing those points
 *   - a tessellated strip geometry generated from the curve every frame
 *   - the satin material (kept stable across renders)
 *
 * The component allocates buffers/objects once in useMemo and reuses them
 * in useFrame - no per-frame garbage.
 */
const Ribbon = ({
  color,
  width,
  segments,
  interactive,
  reduceMotion,
  quality,
}: RibbonProps) => {
  const { clock } = useThree();
  const meshRef = useRef<THREE.Mesh>(null);
  const startedAt = useRef<number | null>(null);

  // ---- subdivision based on quality ---------------------------------------
  const lengthSegments = useMemo(() => {
    if (quality === "low") return Math.max(segments * 4, 60);
    if (quality === "medium") return Math.max(segments * 6, 120);
    return Math.max(segments * 8, 200);
  }, [segments, quality]);
  const widthSegments = quality === "high" ? 2 : 1;

  // ---- control points ------------------------------------------------------
  const points = useMemo(
    () => createControlPoints(segments, width),
    [segments, width]
  );

  // ---- material (stable) ---------------------------------------------------
  const material = useMemo(() => createSatinMaterial(color), [color]);
  useEffect(() => () => material.dispose(), [material]);

  // ---- geometry (stable, vertices updated each frame) ----------------------
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const vertCount = (lengthSegments + 1) * (widthSegments + 1);
    const positions = new Float32Array(vertCount * 3);
    const normals = new Float32Array(vertCount * 3);
    const uvs = new Float32Array(vertCount * 2);

    // index buffer is static
    const indexCount = lengthSegments * widthSegments * 6;
    const indices = new Uint32Array(indexCount);
    let p = 0;
    for (let i = 0; i < lengthSegments; i++) {
      for (let j = 0; j < widthSegments; j++) {
        const a = i * (widthSegments + 1) + j;
        const b = a + 1;
        const c = a + (widthSegments + 1);
        const d = c + 1;
        indices[p++] = a;
        indices[p++] = c;
        indices[p++] = b;
        indices[p++] = b;
        indices[p++] = c;
        indices[p++] = d;
      }
    }

    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    g.setIndex(new THREE.BufferAttribute(indices, 1));
    return g;
  }, [lengthSegments, widthSegments]);
  useEffect(() => () => geometry.dispose(), [geometry]);

  // ---- mouse ---------------------------------------------------------------
  const { world: mouseWorld, active: mouseActive } = useMouseWorld(
    interactive && !reduceMotion
  );

  // ---- reusable temporaries (NO allocations in useFrame) -------------------
  const tmp = useMemo(() => {
    const vec3List: THREE.Vector3[] = new Array(segments);
    for (let i = 0; i < segments; i++) vec3List[i] = new THREE.Vector3();
    return {
      curvePoints: vec3List,
      curve: new THREE.CatmullRomCurve3(vec3List, false, "centripetal", 0.5),
      pos: new THREE.Vector3(),
      tangent: new THREE.Vector3(),
      normal: new THREE.Vector3(),
      binormal: new THREE.Vector3(),
      up: new THREE.Vector3(0, 1, 0),
    };
  }, [segments]);

  // ---- entrance state ------------------------------------------------------
  const ENTRANCE_DURATION = 1.8;

  useFrame((state, delta) => {
    if (startedAt.current === null) startedAt.current = state.clock.elapsedTime;
    const elapsed = state.clock.elapsedTime - startedAt.current;

    // ease the entrance progress (cubic out so the head slows as it lands)
    const rawEntrance = Math.min(elapsed / ENTRANCE_DURATION, 1);
    const entrance = reduceMotion ? 1 : 1 - Math.pow(1 - rawEntrance, 3);

    // ---- step physics ------------------------------------------------------
    const settled = entrance >= 1;
    const dtScale = Math.min(delta * 60, 2); // clamp at 30fps so spikes don't blow up
    if (!reduceMotion) {
      stepRibbon(points, {
        mouseX: mouseWorld.current.x,
        mouseY: mouseWorld.current.y,
        mouseActive: mouseActive.current && settled,
        radius: 1.5,
        push: 0.0035 * dtScale,
        spring: 0.05 * dtScale,
        damping: 0.085,
        time: clock.elapsedTime,
        iterations: quality === "high" ? 4 : 3,
        breath: 0.00012 * dtScale,
        entrance,
      });
    }

    // ---- update curve from control points ----------------------------------
    for (let i = 0; i < segments; i++) {
      const p = points[i];
      tmp.curvePoints[i].set(p.x, p.y, p.z);
    }
    const curve = tmp.curve;

    // ---- generate ribbon strip --------------------------------------------
    const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const normalAttr = geometry.getAttribute("normal") as THREE.BufferAttribute;
    const uvAttr = geometry.getAttribute("uv") as THREE.BufferAttribute;
    const posArr = positionAttr.array as Float32Array;
    const nrmArr = normalAttr.array as Float32Array;
    const uvArr = uvAttr.array as Float32Array;

    const halfWidth = 0.18; // ribbon strip thickness in world units
    const ws = widthSegments;
    const ls = lengthSegments;

    for (let i = 0; i <= ls; i++) {
      const t = i / ls;
      curve.getPointAt(t, tmp.pos);
      curve.getTangentAt(t, tmp.tangent).normalize();
      // binormal = tangent x up, then normal = binormal x tangent
      tmp.binormal.crossVectors(tmp.tangent, tmp.up);
      if (tmp.binormal.lengthSq() < 0.0001) {
        tmp.binormal.set(0, 0, 1);
      } else {
        tmp.binormal.normalize();
      }
      tmp.normal.crossVectors(tmp.binormal, tmp.tangent).normalize();

      // gentle twist along the ribbon for satin shimmer
      const twist =
        Math.sin(t * Math.PI * 1.4 + clock.elapsedTime * 0.18) * 0.35 +
        Math.sin(t * Math.PI * 3.1) * 0.18;
      const cosT = Math.cos(twist);
      const sinT = Math.sin(twist);

      for (let j = 0; j <= ws; j++) {
        const w = j / ws - 0.5;
        // rotate the width offset around the tangent so the ribbon twists
        const bx = tmp.binormal.x * cosT + tmp.normal.x * sinT;
        const by = tmp.binormal.y * cosT + tmp.normal.y * sinT;
        const bz = tmp.binormal.z * cosT + tmp.normal.z * sinT;
        const nx = -tmp.binormal.x * sinT + tmp.normal.x * cosT;
        const ny = -tmp.binormal.y * sinT + tmp.normal.y * cosT;
        const nz = -tmp.binormal.z * sinT + tmp.normal.z * cosT;

        const idx = (i * (ws + 1) + j) * 3;
        posArr[idx] = tmp.pos.x + bx * w * 2 * halfWidth;
        posArr[idx + 1] = tmp.pos.y + by * w * 2 * halfWidth;
        posArr[idx + 2] = tmp.pos.z + bz * w * 2 * halfWidth;
        nrmArr[idx] = nx;
        nrmArr[idx + 1] = ny;
        nrmArr[idx + 2] = nz;

        const uvIdx = (i * (ws + 1) + j) * 2;
        uvArr[uvIdx] = t;
        uvArr[uvIdx + 1] = j / ws;
      }
    }
    positionAttr.needsUpdate = true;
    normalAttr.needsUpdate = true;
    uvAttr.needsUpdate = true;
    geometry.computeBoundingSphere();

    // ---- shader time -------------------------------------------------------
    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      castShadow={false}
      receiveShadow={false}
      frustumCulled={false}
    />
  );
};

export default Ribbon;