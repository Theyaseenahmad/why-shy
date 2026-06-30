"use client";

import { Reveal } from "@/app/components/ui/Reveal";
import { processSteps } from "@/app/lib/data";

export function ProcessSection() {
  return (
    <section
      id="process"
      style={{
        padding: "7rem 3rem",
        maxWidth: "1280px",
        margin: "0 auto",
        background: "var(--blush)",
        borderRadius: "48px",
      }}
    >
      <Reveal>
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              background: "var(--baby-pink)",
              color: "var(--hot-pink)",
              fontSize: "0.75rem",
              fontWeight: 700,
              padding: "0.4rem 1rem",
              borderRadius: "100px",
              marginBottom: "1.2rem",
            }}
          >
            how it works
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.4rem)",
              fontWeight: 500,
              color: "var(--magenta)",
              lineHeight: 1.1,
            }}
          >
            from idea to{" "}
            <em style={{ fontStyle: "italic", color: "var(--hot-pink)" }}>
              iconic
            </em>
          </h2>
        </div>
      </Reveal>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
          marginTop: "3rem",
        }}
        className="process-steps-grid"
      >
        {processSteps.map((step, i) => (
          <Reveal key={step.num} delay={i * 0.1}>
            <div style={{ textAlign: "center", position: "relative" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#fff",
                  border: "3px solid var(--hot-pink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "var(--hot-pink)",
                  margin: "0 auto 1.2rem",
                }}
              >
                {step.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  color: "var(--magenta)",
                  marginBottom: "0.5rem",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "0.82rem",
                  lineHeight: 1.7,
                  color: "#A86485",
                }}
              >
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          #process {
            padding: 5rem 2rem !important;
          }
          .process-steps-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 550px) {
          .process-steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
