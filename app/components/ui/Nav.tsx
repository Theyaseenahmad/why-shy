"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks } from "@/app/lib/data";
import Image from "next/image";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.5rem 2rem",
        background: scrolled
          ? "rgba(255, 251, 248, 0.92)"
          : "rgba(255, 251, 248, 0.7)",
        backdropFilter: "blur(8px)",
        borderBottom: "2px solid var(--baby-pink)",
        transition: "background 0.3s, padding 0.3s",
        ...(scrolled && { padding: "1.1rem 3rem" }),
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--font-script), cursive",
          fontSize: "2rem",
          fontWeight: 600,
          color: "var(--hot-pink)",
          textDecoration: "none",
          display: "inline-block",
          transform: "rotate(-2deg)",
        }}
      >
        <Image src="/assets/whyshy.png" alt="whyshy" width={80} height={80} />
      </Link>

      {/* Desktop links */}
      <ul
        className="desktop-nav-links"
        style={{
          display: "flex",
          gap: "2.5rem",
          listStyle: "none",
          alignItems: "center",
        }}
      >
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--magenta)",
                textDecoration: "none",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--hot-pink)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--magenta)")
              }
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            style={{
              background: "var(--hot-pink)",
              color: "#fff",
              padding: "0.65rem 1.4rem",
              borderRadius: "100px",
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: 700,
              fontSize: "0.85rem",
              textDecoration: "none",
              transition: "transform 0.25s, background 0.25s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "var(--magenta)";
              (e.target as HTMLElement).style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "var(--hot-pink)";
              (e.target as HTMLElement).style.transform = "scale(1)";
            }}
          >
            let&apos;s talk
          </a>
        </li>
      </ul>

      {/* Mobile menu button */}
      <button
        className="mobile-nav-btn"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        style={{
          display: "none",
          background: "none",
          border: "none",
          fontSize: "1.5rem",
          color: "var(--hot-pink)",
          cursor: "pointer",
        }}
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="mobile-nav-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            borderBottom: "2px solid var(--baby-pink)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: "var(--magenta)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            style={{
              background: "var(--hot-pink)",
              color: "#fff",
              padding: "0.8rem 1.4rem",
              borderRadius: "100px",
              fontFamily: "var(--font-sans), sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            let&apos;s talk
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav-links { display: none !important; }
          .mobile-nav-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
