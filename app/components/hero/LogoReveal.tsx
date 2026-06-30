"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useTransform } from "framer-motion";
import { useLogoHighlight } from "./useLogoHighlight";
import { LOGO_VIEWBOX, silkGradient } from "./logoMask";
import type { LogoRevealProps } from "./logo-types";

/**
 * LogoReveal — luxury silk-mask reveal for the WhyShy emblem.
 *
 * The logo (serif "W" inside a laurel wreath, crossed by a satin banner) is
 * recreated as inline SVG. A diagonal gradient mask sweeps across the logo
 * on first mount, after which it settles into a stationary sheen that
 * shifts slightly with the cursor (≤3px).
 */
const LogoReveal = ({
  className,
  size = 220,
  accent = "#FF6AA8",
}: LogoRevealProps) => {
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);
    const h = () => setReduceMotion(mql.matches);
    mql.addEventListener("change", h);
    return () => mql.removeEventListener("change", h);
  }, []);

  const { progress, pointerX, pointerY, intensity } =
    useLogoHighlight(reduceMotion);

  // Gradient anchors derived from progress (no React rerender)
  const x1 = useTransform(progress, (p) => silkGradient(p, 115).x1);
  const y1 = useTransform(progress, (p) => silkGradient(p, 115).y1);
  const x2 = useTransform(progress, (p) => silkGradient(p, 115).x2);
  const y2 = useTransform(progress, (p) => silkGradient(p, 115).y2);

  // After-reveal stationary sheen — also a gradient, just slower and centred
  const sheenX1 = useTransform(pointerX, (v) => 60 + v);
  const sheenY1 = useTransform(pointerY, (v) => 30 + v);
  const sheenX2 = useTransform(pointerX, (v) => 140 + v);
  const sheenY2 = useTransform(pointerY, (v) => 170 + v);

  const transform = useMotionTemplate`translate3d(${pointerX}px, ${pointerY}px, 0)`;

  return (
    <div
      className={className}
      data-testid="logo-reveal-root"
      style={{ width: size, height: size }}
    >
      <motion.svg
        viewBox={`0 0 ${LOGO_VIEWBOX} ${LOGO_VIEWBOX}`}
        width={size}
        height={size}
        style={{ overflow: "visible", transform }}
        role="img"
        aria-label="WhyShy"
      >
        <defs>
          {/* moving silk mask gradient: white reveals, black hides */}
          <motion.linearGradient
            id="logo-silk-mask"
            gradientUnits="userSpaceOnUse"
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
          >
            <stop offset="0" stopColor="#000" />
            <stop offset="0.42" stopColor="#000" />
            <stop offset="0.5" stopColor="#fff" />
            <stop offset="0.58" stopColor="#000" />
            <stop offset="1" stopColor="#000" />
          </motion.linearGradient>

          {/* once revealed: full white — keeps logo visible. We blend
              by stacking two masks: 'silk' (animated) and 'solid'. */}
          <linearGradient id="logo-solid-mask" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>

          <mask id="logo-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
            {/* reveal threshold: silk mask used until intensity >= 0.5 */}
            <rect width="200" height="200" fill="url(#logo-silk-mask)" />
            <motion.rect
              width="200"
              height="200"
              fill="url(#logo-solid-mask)"
              style={{ opacity: intensity }}
            />
          </mask>

          {/* post-reveal travelling sheen on top */}
          <motion.linearGradient
            id="logo-sheen"
            gradientUnits="userSpaceOnUse"
            x1={sheenX1}
            y1={sheenY1}
            x2={sheenX2}
            y2={sheenY2}
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.48" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.52" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="0.56" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </motion.linearGradient>

          {/* satin banner gradient */}
          <linearGradient id="banner-satin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFD6E4" />
            <stop offset="0.45" stopColor={accent} />
            <stop offset="1" stopColor="#C84B85" />
          </linearGradient>
          <linearGradient id="banner-highlight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.10" />
          </linearGradient>
        </defs>

        {/* Mask wrapper for the entire emblem except the satin banner */}
        <g mask="url(#logo-mask)">
          {/* Left laurel branch */}
          <g
            fill="#0E0E16"
            stroke="#0E0E16"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M58 100 C 48 80, 50 60, 64 44" fill="none" />
            {/* leaves */}
            <path d="M52 92 q -7 -2 -10 -10 q 7 0 11 8 z" />
            <path d="M50 82 q -8 -1 -11 -9 q 8 -1 12 7 z" />
            <path d="M49 71 q -8 0 -12 -8 q 8 -2 13 6 z" />
            <path d="M51 60 q -7 1 -12 -6 q 7 -3 13 4 z" />
            <path d="M55 50 q -6 2 -12 -4 q 6 -4 13 2 z" />
            <path d="M61 41 q -5 3 -11 -1 q 4 -5 12 0 z" />
            {/* inside leaves */}
            <path d="M58 92 q 6 -3 11 -1 q -4 6 -12 5 z" />
            <path d="M55 82 q 6 -3 12 -1 q -4 6 -13 5 z" />
            <path d="M54 71 q 6 -3 12 -1 q -4 6 -13 5 z" />
            <path d="M56 60 q 6 -3 12 -1 q -4 6 -13 5 z" />
          </g>

          {/* Right laurel branch (mirrored) */}
          <g
            fill="#0E0E16"
            stroke="#0E0E16"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M142 100 C 152 80, 150 60, 136 44" fill="none" />
            <path d="M148 92 q 7 -2 10 -10 q -7 0 -11 8 z" />
            <path d="M150 82 q 8 -1 11 -9 q -8 -1 -12 7 z" />
            <path d="M151 71 q 8 0 12 -8 q -8 -2 -13 6 z" />
            <path d="M149 60 q 7 1 12 -6 q -7 -3 -13 4 z" />
            <path d="M145 50 q 6 2 12 -4 q -6 -4 -13 2 z" />
            <path d="M139 41 q 5 3 11 -1 q -4 -5 -12 0 z" />
            <path d="M142 92 q -6 -3 -11 -1 q 4 6 12 5 z" />
            <path d="M145 82 q -6 -3 -12 -1 q 4 6 13 5 z" />
            <path d="M146 71 q -6 -3 -12 -1 q 4 6 13 5 z" />
            <path d="M144 60 q -6 -3 -12 -1 q 4 6 13 5 z" />
          </g>

          {/* Serif "W" — drawn as a path for control */}
          <text
            x="100"
            y="118"
            textAnchor="middle"
            fontFamily="'Bodoni Moda','Didot','Garamond',serif"
            fontStyle="italic"
            fontWeight={500}
            fontSize="78"
            fill="#0E0E16"
            letterSpacing="-2"
          >
            W
          </text>
        </g>

        {/* Satin banner — sits on top and is also touched by the sheen */}
        <g>
          <rect
            x="40"
            y="92"
            width="120"
            height="16"
            rx="8"
            fill="url(#banner-satin)"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="0.8"
          />
          <rect
            x="40"
            y="92"
            width="120"
            height="16"
            rx="8"
            fill="url(#banner-highlight)"
          />
          {/* banner folds */}
          <path d="M40 100 l -8 4 l 0 -10 z" fill="#C84B85" />
          <path d="M160 100 l 8 4 l 0 -10 z" fill="#C84B85" />
        </g>

        {/* Sheen overlay applied to the whole emblem */}
        <rect
          x="0"
          y="0"
          width="200"
          height="200"
          fill="url(#logo-sheen)"
          style={{ mixBlendMode: "screen" as const, pointerEvents: "none" }}
        />
      </motion.svg>
    </div>
  );
};

export default LogoReveal;
