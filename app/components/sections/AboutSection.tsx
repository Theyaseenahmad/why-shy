"use client";

import { Ribbon, Flower } from "lucide-react";
import { Reveal } from "@/app/components/ui/Reveal";

export function AboutSection() {
  return (
    <section
      id="about"
      style={{
        padding: "7rem 3rem",
        background: "var(--cream)",
        display: "grid",
        gridTemplateColumns: "0.9fr 1.1fr",
        gap: "5rem",
        alignItems: "center",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* Blob image stack */}
      <Reveal>
        <div style={{ position: "relative", aspectRatio: "1 / 1" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, var(--bubblegum), var(--baby-pink))",
              borderRadius: "42% 58% 65% 35% / 45% 40% 60% 55%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-script), cursive",
                fontSize: "2.4rem",
                color: "var(--hot-pink)",
                transform: "rotate(-4deg)",
                textAlign: "center",
                fontWeight: 600,
                lineHeight: 1.2,
              }}
            >
              pretty
              <br />
              brand,
              <br />
              pretty
              <br />
              results
            </span>
          </div>

          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-10px",
              right: "10px",
              transform: "rotate(12deg)",
              filter: "drop-shadow(0 4px 10px rgba(168,40,90,0.18))",
            }}
          >
            <Ribbon size={56} color="#E0457B" strokeWidth={1.5} />
          </div>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: "-20px",
              transform: "rotate(-10deg)",
              filter: "drop-shadow(0 4px 10px rgba(168,40,90,0.18))",
            }}
          >
            <Flower size={48} color="#E0457B" strokeWidth={1.5} fill="#F4A6C6" />
          </div>
        </div>
      </Reveal>

      {/* Text content */}
      <Reveal delay={0.12}>
        <span
          style={{
            display: "inline-block",
            background: "var(--baby-pink)",
            color: "var(--hot-pink)",
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "0.4rem 1rem",
            borderRadius: "100px",
            marginBottom: "1.5rem",
          }}
        >
          about us
        </span>
        <h2
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "clamp(2rem, 3.6vw, 3.2rem)",
            fontWeight: 500,
            lineHeight: 1.15,
            color: "var(--magenta)",
            marginBottom: "1.5rem",
          }}
        >
          we don&apos;t believe marketing
          <br />
          has to feel{" "}
          <em style={{ fontStyle: "italic", color: "var(--hot-pink)" }}>
            corporate.
          </em>
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans), sans-serif",
            fontSize: "0.98rem",
            lineHeight: 1.9,
            color: "var(--muted-rose)",
            fontWeight: 400,
          }}
        >
          whyshy is a creative marketing studio for brands who want strategy
          with soul. We mix data-backed thinking with an aesthetic that
          actually feels human — soft, bold, a little chaotic in the best
          way. No boring decks, no beige campaigns. Just work that makes
          people stop scrolling.
        </p>
      </Reveal>

      <style>{`
        @media (max-width: 900px) {
          #about {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding: 5rem 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
