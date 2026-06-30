"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/app/components/ui/Reveal";
import { testimonials } from "@/app/lib/data";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, paused]);

  const goTo = (i: number) => {
    setCurrent(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 8000);
  };

  return (
    <section
      id="testimonials"
      style={{
        padding: "7rem 3rem",
        maxWidth: "900px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <Reveal>
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
          love notes
        </span>
        <h2
          style={{
            fontFamily: "var(--font-serif), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.4rem)",
            fontWeight: 500,
            color: "var(--magenta)",
            lineHeight: 1.1,
            marginBottom: "3rem",
          }}
        >
          what clients{" "}
          <em style={{ fontStyle: "italic", color: "var(--hot-pink)" }}>
            say
          </em>
        </h2>
      </Reveal>

      <div style={{ position: "relative", minHeight: "14rem" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div
              className="bubble-tail"
              style={{
                background: "#fff",
                border: "2px solid var(--baby-pink)",
                borderRadius: "28px",
                padding: "2.5rem 3rem",
                position: "relative",
                marginBottom: "2.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "1.4rem",
                  color: "var(--magenta)",
                  lineHeight: 1.5,
                }}
              >
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
            </div>

            <p
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--hot-pink)",
              }}
            >
              {testimonials[current].author}
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "0.78rem",
                color: "#C4849E",
                marginTop: "0.2rem",
              }}
            >
              {testimonials[current].role}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.6rem",
          marginTop: "2.5rem",
        }}
        role="tablist"
        aria-label="Testimonial navigation"
      >
        {testimonials.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Testimonial ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? "1.8rem" : "0.6rem",
              height: "0.6rem",
              borderRadius: "100px",
              background: i === current ? "var(--hot-pink)" : "var(--baby-pink)",
              border: "none",
              cursor: "pointer",
              transition: "width 0.3s, background 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
