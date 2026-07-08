import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#04060D",
          900: "#060A14",
          850: "#0A101F",
          800: "#0D1526",
          700: "#131D33",
        },
        brand: {
          300: "#7CC8F0",
          400: "#3FB0EA",
          500: "#1B9DE4",
          600: "#137FBC",
          700: "#0F6698",
        },
        accent: {
          400: "#818CF8",
          500: "#6366F1",
        },
        cyanish: "#22D3EE",
        ink: "#E7ECF5",
        muted: "#9DA9BF",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: { wrap: "76rem" },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: {
        glowBlue: "0 0 60px 0 rgba(27,157,228,0.25)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
