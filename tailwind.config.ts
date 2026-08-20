import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F7F1E6",
        paper: "#FBF7EE",
        espresso: "#2E211A",
        coffee: "#4A2E22",
        brick: "#B23A26",
        bordeaux: "#7A1E2B",
        pine: "#1F4B3F",
        ink: "#211A15",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(46, 33, 26, 0.08)",
        cardHover: "0 8px 24px rgba(46, 33, 26, 0.14)",
      },
      borderRadius: {
        card: "0.75rem",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
