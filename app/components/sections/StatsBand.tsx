"use client";

import { Reveal } from "@/app/components/ui/Reveal";
import { stats } from "@/app/lib/data";

export function StatsBand() {
  return (
    <section
      style={{
        padding: "0 3rem",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <Reveal>
        <div
          style={{
            background: "var(--hot-pink)",
            padding: "3.5rem 3rem",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            borderRadius: "32px",
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "2.6rem",
                  fontWeight: 500,
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  color: "#FBC4D9",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginTop: "0.5rem",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <style>{`
        @media (max-width: 700px) {
          section > div > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
