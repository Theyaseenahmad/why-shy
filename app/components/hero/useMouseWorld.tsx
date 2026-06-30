import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hook that maps the latest mouse position into world-space coordinates on
 * the Z=0 plane. The returned ref is updated synchronously on every mouse
 * move - no React re-renders.
 */
export const useMouseWorld = (enabled: boolean) => {
  const { camera, size, gl } = useThree();
  const world = useRef(new THREE.Vector3(0, 0, 0));
  const active = useRef(false);

  useEffect(() => {
    if (!enabled) {
      active.current = false;
      return;
    }
    const dom = gl.domElement;
    const ndc = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const ray = new THREE.Raycaster();
    const intersection = new THREE.Vector3();

    const handleMove = (e: PointerEvent) => {
      const rect = dom.getBoundingClientRect();
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      ray.setFromCamera(ndc, camera);
      const hit = ray.ray.intersectPlane(plane, intersection);
      if (hit) {
        world.current.copy(intersection);
        active.current = true;
      }
    };
    const handleLeave = () => {
      active.current = false;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    dom.addEventListener("pointerleave", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      dom.removeEventListener("pointerleave", handleLeave);
    };
  }, [camera, gl, enabled, size.width, size.height]);

  return { world, active };
};
