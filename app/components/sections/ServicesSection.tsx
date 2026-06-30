"use client";

import {
  Smartphone,
  Clapperboard,
  Heart,
  Palette,
  BarChart3,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/app/components/ui/Reveal";
import { services } from "@/app/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Clapperboard,
  Heart,
  Palette,
  BarChart3,
  Sparkles,
};

export function ServicesSection() {
  return (
    <section
      id="services"
      style={{
        padding: "7rem 3rem",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
            what we do
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
            services that{" "}
            <em style={{ fontStyle: "italic", color: "var(--hot-pink)" }}>
              actually move
            </em>
            <br />
            the needle
          </h2>
        </div>
      </Reveal>

      {/* Grid */}
      <div
        className="services-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.75rem",
        }}
      >
        {services.map((service, i) => {
          const Icon = iconMap[service.icon] ?? Sparkles;
          return (
            <Reveal key={service.id} delay={i * 0.07}>
              <ServiceCard icon={Icon} title={service.title} description={service.description} />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "2px solid var(--baby-pink)",
        borderRadius: "24px",
        padding: "2.2rem",
        transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px) rotate(-0.5deg)";
        e.currentTarget.style.borderColor = "var(--bubblegum)";
        e.currentTarget.style.boxShadow = "0 16px 32px rgba(224,69,123,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) rotate(0deg)";
        e.currentTarget.style.borderColor = "var(--baby-pink)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          background: "var(--baby-pink)",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.2rem",
        }}
      >
        <Icon size={24} color="#E0457B" strokeWidth={2} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-serif), Georgia, serif",
          fontSize: "1.3rem",
          fontWeight: 500,
          color: "var(--magenta)",
          marginBottom: "0.6rem",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-sans), sans-serif",
          fontSize: "0.88rem",
          lineHeight: 1.7,
          color: "#A86485",
        }}
      >
        {description}
      </p>
    </div>
  );
}
