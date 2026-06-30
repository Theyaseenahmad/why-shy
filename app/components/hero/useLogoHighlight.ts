import { useEffect, useState } from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  animate,
  type MotionValue,
} from "framer-motion";

/**
 * Drives the silk highlight animation for LogoReveal.
 *
 * Phase 1 (0 .. 1.6s): `progress` animates 0 -> 1 with a custom ease so the
 *   highlight sweeps across the logo, revealing it through the mask.
 * Phase 2 (post-reveal): `progress` settles into a steady sheen value
 *   (~0.55) and the cursor nudges the sheen by 2-3 px max.
 *
 * Returns motion values that LogoReveal binds straight to SVG attributes
 * — no per-frame React renders.
 */
export interface UseLogoHighlightResult {
  progress: MotionValue<number>;
  angle: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  intensity: MotionValue<number>;
  revealed: boolean;
}

export const useLogoHighlight = (
  reduceMotion: boolean
): UseLogoHighlightResult => {
  const progress = useMotionValue(reduceMotion ? 1 : 0);
  const angle = useMotionValue(115); // diagonal highlight
  const intensity = useMotionValue(reduceMotion ? 0.55 : 0);

  const pxRaw = useMotionValue(0);
  const pyRaw = useMotionValue(0);
  // 2-3 px max movement per spec → clamp via useTransform
  const pointerX = useSpring(
    useTransform(pxRaw, [-1, 1], [-2.5, 2.5]),
    { stiffness: 80, damping: 18, mass: 0.4 }
  );
  const pointerY = useSpring(
    useTransform(pyRaw, [-1, 1], [-2.5, 2.5]),
    { stiffness: 80, damping: 18, mass: 0.4 }
  );

  const [revealed, setRevealed] = useState(reduceMotion);

  // Phase 1: entrance reveal
  useEffect(() => {
    if (reduceMotion) {
      progress.set(1);
      intensity.set(0.55);
      setRevealed(true);
      return;
    }
    const controls = animate(progress, 1, {
      duration: 1.6,
      ease: [0.22, 0.8, 0.2, 1],
      onComplete: () => setRevealed(true),
    });
    const fade = animate(intensity, 0.55, {
      duration: 1.6,
      ease: [0.22, 0.8, 0.2, 1],
    });
    return () => {
      controls.stop();
      fade.stop();
    };
  }, [reduceMotion, progress, intensity]);

  // Phase 2: cursor nudge — purely passive listener
  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      pxRaw.set((e.clientX / w) * 2 - 1);
      pyRaw.set((e.clientY / h) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, pxRaw, pyRaw]);

  return { progress, angle, pointerX, pointerY, intensity, revealed };
};
