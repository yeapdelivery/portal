import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "animation-pulse": {
          "0%, 100%": { transform: "scale(1);" },
          "50%": { transform: "scale(0.95);" },
        },
      },
      animation: {
        "pulse-click": "animation-pulse 0.5s linear",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        red: {
          "primary-dark": "#B50010",
          default: "#E2272A",
          "primary-light": "#E46B6B",
        },
        yellow: {
          "primary-dark": "#ffab00",
          default: "#ffdd00",
          "primary-light": "#FCF267",
        },
        error: {
          "red-dark": "#DE3961",
          default: "#F64F77",
          "red-light": "#FC6F91",
        },
        green: {
          "primary-dark": "#00A051",
          default: "#3DCD80",
          "primary-light": "#C2EDD2",
        },
        gray: {
          "100": "#1F1D2B",
          "200": "#403e4d",
          "300": "#5f5c6d",
          "400": "#737081",
          "500": "#9c99ab",
          "600": "#bcb8cb",
          "700": "#dfdbef",
          "800": "#eeeafd",
          "900": "#f5f2ff",
          "1000": "#fbf7ff",
        },
      },
    },
  },
  plugins: [],
};
export default config;
