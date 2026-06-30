"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { useMemo } from "react";
import type { FloatingCardData } from "./cards-types";
import { depthFactor } from "./useParallax";

interface Props {
  data: FloatingCardData;
  px: MotionValue<number>;
  py: MotionValue<number>;
  reduceMotion: boolean;
}

const CardContent = ({ data }: { data: FloatingCardData }) => {
  switch (data.variant) {
    case "creator":
      return (
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-full bg-gradient-to-br from-[#ffd0e1] via-[#ff9dbf] to-[#c44a82] ring-1 ring-black/10 shadow-inner"
            aria-hidden
          />
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-[0.18em] text-black/50">
              {data.label}
            </div>
            <div className="text-[13px] font-medium text-black/85">
              {data.title}
            </div>
          </div>
          <span className="ml-auto text-[10px] rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-700">
            {data.meta ?? "98%"}
          </span>
        </div>
      );
    case "campaign":
      return (
        <div className="flex items-center gap-3">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-[0.18em] text-black/50">
              {data.label}
            </div>
            <div className="text-[13px] font-medium text-black/85">
              {data.title}
            </div>
          </div>
        </div>
      );
    case "metric":
      return (
        <div className="leading-none">
          <div className="text-[10px] uppercase tracking-[0.18em] text-black/50 mb-1.5">
            {data.label}
          </div>
          <div className="font-display text-[28px] tracking-tight text-black/90">
            {data.title}
          </div>
          {data.meta && (
            <div className="text-[10px] text-emerald-700 mt-1.5">
              {data.meta}
            </div>
          )}
        </div>
      );
    case "tag":
      return (
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#FF6AA8]" />
          <div className="text-[12px] font-medium text-black/80 tracking-tight">
            {data.title}
          </div>
        </div>
      );
    case "status":
      return (
        <div className="flex items-center gap-2.5">
          <div className="h-6 w-6 rounded-md bg-black/85 grid place-items-center text-[#FFD6E4] text-[11px]">
            ✓
          </div>
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-[0.18em] text-black/50">
              {data.label}
            </div>
            <div className="text-[12px] font-medium text-black/85">
              {data.title}
            </div>
          </div>
        </div>
      );
    case "strategy":
    default:
      return (
        <div className="leading-tight">
          <div className="text-[10px] uppercase tracking-[0.18em] text-black/50 mb-1">
            {data.label}
          </div>
          <div className="font-display italic text-[15px] text-black/85">
            {data.title}
          </div>
          {data.meta && (
            <div className="text-[10px] text-black/45 mt-1.5">{data.meta}</div>
          )}
        </div>
      );
  }
};

const FloatingCard = ({ data, px, py, reduceMotion }: Props) => {
  const factor = depthFactor(data.depth);

  // translate range scales with depth
  const tx = useTransform(px, [-1, 1], [-26 * factor, 26 * factor]);
  const ty = useTransform(py, [-1, 1], [-22 * factor, 22 * factor]);
  // rotate: max 4deg per spec
  const rx = useTransform(py, [-1, 1], [4 * factor, -4 * factor]);
  const ry = useTransform(px, [-1, 1], [-4 * factor, 4 * factor]);

  const idleDelay = useMemo(() => data.order * 0.18, [data.order]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${data.x * 100}%`,
        top: `${data.y * 100}%`,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 10 + data.depth,
        perspective: 1000,
      }}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1.1,
                delay: 0.45 + idleDelay,
                ease: [0.16, 0.84, 0.24, 1],
              },
            }
      }
    >
      <motion.div
        style={{
          translateX: reduceMotion ? 0 : tx,
          translateY: reduceMotion ? 0 : ty,
          rotateX: reduceMotion ? 0 : rx,
          rotateY: reduceMotion ? 0 : ry,
          rotateZ: data.tilt,
          transformStyle: "preserve-3d",
        }}
      >
        {/* idle drift — very small, irrational frequencies so it never loops */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -4 * factor, 1 * factor, -2 * factor, 0],
                  x: [0, 2 * factor, -1 * factor, 1.5 * factor, 0],
                }
          }
          transition={{
            duration: 11 + data.order * 1.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            data-testid={`floating-card-${data.id}`}
            className="relative select-none rounded-[14px] bg-[#fbf6ee] px-4 py-3 min-w-[160px] max-w-[230px] shadow-[0_18px_40px_-18px_rgba(20,15,30,0.35),0_2px_6px_-2px_rgba(20,15,30,0.18)] ring-1 ring-black/[0.06]"
            style={{
              boxShadow: `0 ${10 + data.depth * 4}px ${
                20 + data.depth * 8
              }px -${10 + data.depth * 2}px rgba(15,10,25,${0.18 + data.depth * 0.05})`,
            }}
          >
            <CardContent data={data} />
            {/* subtle inner highlight to feel pressed/printed */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[14px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0) 35%)",
                mixBlendMode: "overlay",
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FloatingCard;
