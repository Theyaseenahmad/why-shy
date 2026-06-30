"use client";
import { use, useEffect, useMemo, useState } from "react";
import FloatingCard from "./FloatingCard";
import type { FloatingCardData } from "./cards-types";
import { useParallax } from "./useParallax";

/**
 * FloatingCards composes the editorial card constellation that lives behind
 * the hero typography. Layout is responsive:
 *  - desktop: 6 cards
 *  - tablet:  4 cards
 *  - mobile:  2 (decorative) cards
 *
 * Card position, depth and tilt are deliberately hand-tuned for editorial
 * balance — not algorithmic.
 */
const ALL_CARDS: FloatingCardData[] = [
  {
    id: "match-made",
    label: "💌 Perfect Match",
    title: "Brand × Creator",
    meta: "it's giving soulmates",
    x: 0.10,
    y: 0.34,
    depth: 4,
    tilt: -5,
    variant: "creator",
    order: 0,
  },
  {
    id: "love-note",
    label: "🎀 New Campaign",
    title: "soft launch era",
    meta: "now live",
    x: 0.86,
    y: 0.28,
    depth: 5,
    tilt: 4,
    variant: "campaign",
    order: 1,
  },
  {
    id: "girls-girls",
    label: "💖 Community",
    title: "24.6M besties",
    meta: "and still growing",
    x: 0.13,
    y: 0.74,
    depth: 5,
    tilt: 3,
    variant: "metric",
    order: 2,
  },
  {
    id: "ready",
    label: "✨ Status",
    title: "camera ready",
    meta: "posting soon...",
    x: 0.91,
    y: 0.65,
    depth: 3,
    tilt: -3,
    variant: "status",
    order: 3,
  },
  {
    id: "moodboard",
    label: "🩰 Moodboard",
    title: "cute. bold. unforgettable.",
    meta: "approved ♡",
    x: 0.21,
    y: 0.18,
    depth: 2,
    tilt: 6,
    variant: "strategy",
    order: 4,
  },
  {
    id: "pink-folder",
    label: "🌷 Content",
    title: "going viral...",
    meta: "loading ♡",
    x: 0.78,
    y: 0.84,
    depth: 2,
    tilt: -4,
    variant: "tag",
    order: 5,
  },
];

const useTier = () => {
  const [tier, setTier] = useState<"desktop" | "tablet" | "mobile">("desktop");
  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;
      if (w < 640) setTier("mobile");
      else if (w < 1024) setTier("tablet");
      else setTier("desktop");
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);
  return tier;
};

const useReducedMotion = () => {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mql.matches);
    const h = () => setReduce(mql.matches);
    mql.addEventListener("change", h);
    return () => mql.removeEventListener("change", h);
  }, []);
  return reduce;
};

const FloatingCards = () => {
  const tier = useTier();
  const reduceMotion = useReducedMotion();

  const cards = useMemo(() => {
    if (tier === "mobile") {
      return ALL_CARDS.filter((c) =>
        ["creator-match", "reach"].includes(c.id)
      );
    }
    if (tier === "tablet") {
      return ALL_CARDS.filter((c) =>
        ["creator-match", "campaign-live", "reach", "direction"].includes(c.id)
      );
    }
    return ALL_CARDS;
  }, [tier]);

  const { px, py } = useParallax(!reduceMotion);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-30"
      data-testid="floating-cards-root"
      aria-hidden="true"
    >
      {cards.map((c) => (
        <FloatingCard
          key={c.id}
          data={c}
          px={px}
          py={py}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
};

export default FloatingCards;
