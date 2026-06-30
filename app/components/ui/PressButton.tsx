"use client";

import { cn } from "@/app/lib/utils";

interface PressButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "white";
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  className?: string;
}

export function PressButton({
  children,
  variant = "primary",
  onClick,
  href,
  type = "button",
  className,
}: PressButtonProps) {
  const baseStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans), sans-serif",
    fontWeight: 700,
    fontSize: "0.95rem",
    borderRadius: "100px",
    cursor: "pointer",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.15s, box-shadow 0.15s, border-color 0.2s",
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: "var(--hot-pink)",
      color: "#fff",
      padding: "1.1rem 2.2rem",
      boxShadow: "0 8px 0 var(--magenta)",
    },
    secondary: {
      background: "#fff",
      color: "var(--hot-pink)",
      padding: "1.05rem 2.2rem",
      border: "2px solid var(--bubblegum)",
    },
    white: {
      background: "#fff",
      color: "var(--hot-pink)",
      padding: "1rem 1.8rem",
    },
  };

  const style = { ...baseStyle, ...variantStyles[variant] };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === "primary") {
      e.currentTarget.style.transform = "translateY(6px)";
      e.currentTarget.style.boxShadow = "0 2px 0 var(--magenta)";
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === "primary") {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 8px 0 var(--magenta)";
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === "secondary") {
      e.currentTarget.style.borderColor = "var(--hot-pink)";
      e.currentTarget.style.transform = "translateY(-2px)";
    } else if (variant === "white") {
      e.currentTarget.style.transform = "scale(1.04)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === "secondary") {
      e.currentTarget.style.borderColor = "var(--bubblegum)";
      e.currentTarget.style.transform = "translateY(0)";
    } else if (variant === "white") {
      e.currentTarget.style.transform = "scale(1)";
    } else if (variant === "primary") {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 8px 0 var(--magenta)";
    }
  };

  if (href) {
    return (
      <a
        href={href}
        className={cn(className)}
        style={style}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(className)}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
