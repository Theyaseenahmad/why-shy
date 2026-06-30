"use client";

import { Reveal } from "@/app/components/ui/Reveal";

export function QuoteBand() {
  return (
    <section
      style={{
        background: "var(--rust)",
        padding: "5rem 3rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Reveal>
        <p
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            color: "#FFE4D6",
            letterSpacing: "-0.01em",
            position: "relative",
            zIndex: 2,
          }}
        >
          &ldquo;good vibes, better strategy&rdquo;
        </p>
        <p
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "0.85rem",
            fontWeight: 700,
            color: "#F4B498",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: "1rem",
            position: "relative",
            zIndex: 2,
          }}
        >
          our whole philosophy in five words
        </p>
      </Reveal>
    </section>
  );
}
