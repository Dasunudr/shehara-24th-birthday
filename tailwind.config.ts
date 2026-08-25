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
        champagne: {
          50: "#FAF7F2",
          100: "#F5EFE6",
          200: "#EBD9C8",
          300: "#DFC1A5",
          400: "#D3A982",
          500: "#C48E5D",
          600: "#A97344",
        },
        roseGold: {
          50: "#FDF8F8",
          100: "#FBEFF0",
          200: "#F7D8DC",
          300: "#F1B7C1",
          400: "#E68B9E",
          500: "#D9627B",
          600: "#BF435F",
        },
        sunset: {
          50: "#FFF8F0",
          100: "#FEEDDC",
          200: "#FED4B3",
          300: "#FDB683",
          400: "#FA8D45",
          500: "#F5681E",
          600: "#DB4C10",
        },
        night: {
          900: "#0D0A12",
          850: "#120E1A",
          800: "#1A1526",
          700: "#262038",
          600: "#362F4D",
        },
        botanical: {
          900: "#0D1B13",
          800: "#162E21",
          700: "#224532",
          600: "#316348",
          500: "#448763",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        handwriting: ["var(--font-caveat)", "cursive"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s infinite",
        "spin-slow": "spin 20s linear infinite",
        "ken-burns": "kenburns 25s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        kenburns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "50%": { transform: "scale(1.08) translate(-1%, -1%)" },
          "100%": { transform: "scale(1.04) translate(1%, 1%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
