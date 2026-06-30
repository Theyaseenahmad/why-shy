"use client";

import { useState, FormEvent } from "react";
import { Reveal } from "@/app/components/ui/Reveal";
import { PressButton } from "@/app/components/ui/PressButton";

export function ContactSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Replace with your form handler (Formspree, Resend API route, etc.)
    console.log("Email submitted:", email);
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      style={{
        padding: "7rem 3rem",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <Reveal>
        <div
          style={{
            background: "linear-gradient(135deg, var(--hot-pink), var(--magenta))",
            borderRadius: "40px",
            padding: "5rem 4rem",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 500,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "1.2rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            ready to be
            <br />
            <em style={{ fontStyle: "italic", color: "#FBC4D9" }}>
              everyone&apos;s favorite brand?
            </em>
          </h2>
          <p
            style={{
              color: "#FBC4D9",
              fontSize: "1rem",
              marginBottom: "2.5rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            tell us a little about you — we&apos;ll take it from there.
          </p>

          {submitted ? (
            <p
              style={{
                color: "#fff",
                fontFamily: "var(--font-serif), Georgia, serif",
                fontSize: "1.3rem",
                fontStyle: "italic",
                position: "relative",
                zIndex: 2,
              }}
            >
              thank you — we&apos;ll be in touch soon! 🎀
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: "0.8rem",
                maxWidth: "30rem",
                margin: "0 auto",
                position: "relative",
                zIndex: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                required
                placeholder="your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: "200px",
                  padding: "1rem 1.4rem",
                  borderRadius: "100px",
                  border: "none",
                  fontFamily: "var(--font-sans), sans-serif",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
              <PressButton variant="white" type="submit">
                let&apos;s talk →
              </PressButton>
            </form>
          )}
        </div>
      </Reveal>

      <style>{`
        @media (max-width: 700px) {
          #contact > div > div {
            padding: 3rem 1.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}
