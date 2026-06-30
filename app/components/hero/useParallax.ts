import { useEffect } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Tracks the cursor in normalized [-1, 1] coordinates relative to the
 * viewport and returns spring-smoothed motion values for X and Y.
 *
 * Returned values:
 *   px: -1 (left) .. 1 (right)
 *   py: -1 (top)  .. 1 (bottom)
 *
 * One global listener; cards subscribe via useTransform.
 */
export interface UseParallaxResult {
  px: MotionValue<number>;
  py: MotionValue<number>;
}

export const useParallax = (enabled: boolean): UseParallaxResult => {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (!enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      rawX.set((e.clientX / w) * 2 - 1);
      rawY.set((e.clientY / h) * 2 - 1);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, rawX, rawY]);

  return { px, py };
};

/** Per-card depth factor: closer cards move more. */
export const depthFactor = (depth: number): number => {
  // depth 1 -> 0.25, depth 5 -> 1.0
  return 0.25 + ((depth - 1) / 4) * 0.75;
};

/** Useful transform helper: build translateX based on parallax */
export const useDepthTransform = (
  source: MotionValue<number>,
  depth: number,
  range: number
) => {
  const factor = depthFactor(depth);
  return useTransform(source, [-1, 1], [-range * factor, range * factor]);
};
