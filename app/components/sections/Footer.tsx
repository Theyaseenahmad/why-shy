'use client';
import { socialLinks } from "@/app/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "3rem",
        textAlign: "center",
        background: "var(--cream)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-script), cursive",
          fontSize: "1.8rem",
          color: "var(--hot-pink)",
          marginBottom: "0.8rem",
          transform: "rotate(-2deg)",
          display: "inline-block",
        }}
      >
        whyshy
      </span>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#C4849E",
              textDecoration: "none",
              fontSize: "0.82rem",
              fontWeight: 600,
              transition: "color 0.25s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "var(--hot-pink)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#C4849E")
            }
          >
            {link.label}
          </a>
        ))}
        <a
          href="mailto:hello@whyshy.com"
          style={{
            color: "#C4849E",
            textDecoration: "none",
            fontSize: "0.82rem",
            fontWeight: 600,
            transition: "color 0.25s",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.color = "var(--hot-pink)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.color = "#C4849E")
          }
        >
          hello@whyshy.com
        </a>
      </div>

      <p
        style={{
          fontSize: "0.75rem",
          color: "#D2A6BB",
          marginTop: "1.5rem",
        }}
      >
        © {year} whyshy studio.
      </p>
    </footer>
  );
}
