import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bright, energetic base (light theme)
        paper: "#F1F0EA", // warm bone page background
        panel: "#FFFFFF", // raised cards / panels
        ink: "#0C0D0E", // near-black text + bold blocks
        line: "rgba(12,13,14,0.10)",
        // Club accents
        blaze: "#FF4A1C", // primary club colour (energetic orange-red)
        electric: "#2540FF", // secondary (vivid blue)
        volt: "#C9F227", // highlight (lime) — used sparingly
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        shell: "1440px",
      },
      transitionTimingFunction: {
        // custom expressive easing shared across CSS + JS
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "marquee-x": "marquee-x 40s linear infinite",
        "spin-slow": "spin-slow 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
