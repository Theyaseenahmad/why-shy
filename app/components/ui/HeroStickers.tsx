"use client";

import {
  Flower,
  Flower2,
  Fish,
  Dices,
  Star,
  Heart,
  Cherry,
  Ticket,
  Sparkle,
  type LucideIcon,
} from "lucide-react";
import { heroStickers } from "@/app/lib/data";

// Note: lucide-react has no "Ribbon" icon — using Flower2 as a bow-adjacent
// stand-in. Swap any of these for real sticker PNGs/SVGs when brand assets
// are ready (see README "Swapping in real stickers").
const iconMap: Record<string, LucideIcon> = {
  Ribbon: Flower2,
  Flower2: Flower2,
  Flower: Flower,
  Fish: Fish,
  Dices: Dices,
  Star: Star,
  Heart: Heart,
  Cherry: Cherry,
  Ticket: Ticket,
  Sparkle: Sparkle,
};

const floatAnim = ["float-0", "float-1", "float-2"];

export function HeroStickers() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {heroStickers.map((sticker, i) => {
        const Icon = iconMap[sticker.icon] ?? Sparkle;
        return (
          <div
            key={i}
            className={floatAnim[sticker.float % 3]}
            style={
              {
                position: "absolute",
                top: sticker.top,
                left: sticker.left,
                "--r": `${sticker.rotate}deg`,
                transform: `rotate(${sticker.rotate}deg)`,
                filter: "drop-shadow(0 6px 14px rgba(168,40,90,0.18))",
                animationDelay: `${(i % 5) * 0.4}s`,
              } as React.CSSProperties
            }
          >
            <Icon
              size={sticker.size}
              color="#E0457B"
              strokeWidth={1.5}
              fill={
                ["Heart", "Star", "Cherry"].includes(sticker.icon)
                  ? "#F4A6C6"
                  : "none"
              }
            />
          </div>
        );
      })}
    </div>
  );
}
