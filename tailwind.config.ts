import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "oklch(97% 0.008 65)",
        "bg-2": "oklch(94.5% 0.012 55)",
        "bg-3": "oklch(91% 0.016 52)",
        surface: "oklch(96% 0.010 60)",
        ink: "oklch(19% 0.010 55)",
        "ink-2": "oklch(42% 0.009 55)",
        "ink-3": "oklch(62% 0.007 55)",
        accent: "oklch(71% 0.105 42)",
        "accent-light": "oklch(87% 0.055 42)",
        "accent-dark": "oklch(52% 0.105 40)",
        border: "oklch(88% 0.010 60)",
        "border-2": "oklch(82% 0.014 58)",
      },
      fontFamily: {
        display: ["var(--font-urbanist)", "system-ui", "sans-serif"],
        body: ["var(--font-urbanist)", "system-ui", "sans-serif"],
        serif: ["var(--font-spectral)", "Georgia", "serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1" }],
        "display-2xl": ["clamp(4rem, 9vw, 8.5rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-xl": ["clamp(3rem, 6.5vw, 6.5rem)", { lineHeight: "0.94", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 4.5rem)", { lineHeight: "0.96", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.75rem, 3vw, 3rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.12em" }],
        "label-lg": ["0.75rem", { lineHeight: "1", letterSpacing: "0.1em" }],
      },
      spacing: {
        section: "clamp(6rem, 10vw, 10rem)",
        "section-sm": "clamp(4rem, 7vw, 7rem)",
        gutter: "clamp(1.5rem, 4vw, 4rem)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
        "1200": "1200ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "line-grow": "line-grow 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
