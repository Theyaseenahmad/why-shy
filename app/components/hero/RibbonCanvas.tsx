"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import Ribbon from "./Ribbon";
import type { RibbonCanvasProps } from "./types";

/**
 * RibbonCanvas — the public entry point.
 *
 * Sets up the React Three Fiber Canvas, lights, camera and responsive
 * quality, then mounts `<Ribbon />`. Keeps responsibility minimal so the
 * heavy lifting lives in `Ribbon.tsx` / `physics.ts` / `RibbonMaterial.ts`.
 *
 * Responsive strategy:
 *   - desktop (>1024px): "high" quality, full physics
 *   - tablet  (>=640px): "medium" quality, fewer segments
 *   - mobile  (<640px):  "low" quality, no physics-driven mouse interaction
 *
 * Accessibility:
 *   - respects prefers-reduced-motion → static ribbon, no entrance, no
 *     mouse repulsion, no idle breathing.
 */
const RibbonCanvas = ({
  color = "#FF6AA8",
  width = 5,
  segments = 40,
  interactive = true,
  className,
}: RibbonCanvasProps) => {
  const [tier, setTier] = useState<"high" | "medium" | "low">("high");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      if (w < 640) setTier("low");
      else if (w < 1024) setTier("medium");
      else setTier("high");
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const effectiveSegments = useMemo(() => {
    if (tier === "low") return Math.max(Math.floor(segments * 0.55), 18);
    if (tier === "medium") return Math.max(Math.floor(segments * 0.8), 24);
    return segments;
  }, [tier, segments]);

  // disable mouse-driven interaction on mobile per spec
  const effectiveInteractive = interactive && tier !== "low";

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, tier === "high" ? 2 : 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 38, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        style={{ pointerEvents: effectiveInteractive ? "auto" : "none" }}
        frameloop={reduceMotion ? "demand" : "always"}
      >
        <Suspense fallback={null}>
          {/* soft key + rim + fill so the satin reads as fabric */}
          <ambientLight intensity={0.55} />
          <directionalLight
            position={[2.5, 3.2, 3.6]}
            intensity={1.4}
            color={"#fff4ec"}
          />
          <directionalLight
            position={[-3.0, -1.6, 2.2]}
            intensity={0.45}
            color={"#ffd9e7"}
          />
          <pointLight
            position={[0, 0, 2.4]}
            intensity={0.35}
            color={"#ffe4ef"}
            distance={8}
          />

          <Ribbon
            color={color}
            width={width}
            segments={effectiveSegments}
            interactive={effectiveInteractive}
            reduceMotion={reduceMotion}
            quality={tier}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RibbonCanvas;
