import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "hot-pink": "#E0457B",
        bubblegum: "#F4A6C6",
        "baby-pink": "#FCE4ED",
        blush: "#FDF1F5",
        rust: "#C8552D",
        magenta: "#A8285A",
        "deep-pink": "#C23467",
        cream: "#FFFBF8",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      fontSize: {
        "display-xl": ["clamp(2.8rem,7vw,6.2rem)", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.2rem,5vw,4rem)", { lineHeight: "1.1" }],
        "display-md": ["clamp(2rem,4vw,3.4rem)", { lineHeight: "1.1" }],
      },
      borderRadius: {
        blob: "42% 58% 65% 35% / 45% 40% 60% 55%",
      },
      boxShadow: {
        "btn-press": "0 8px 0 #A8285A",
        "btn-press-active": "0 2px 0 #A8285A",
        card: "0 16px 32px rgba(224,69,123,0.12)",
      },
      animation: {
        "float-0": "float0 7s ease-in-out infinite",
        "float-1": "float1 8s ease-in-out infinite",
        "float-2": "float2 6.5s ease-in-out infinite",
      },
      keyframes: {
        float0: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        float1: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float2: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
