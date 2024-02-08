import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "330px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      keyframes: {
        "fade-in-left": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-out-left": {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "animation-pulse": {
          "0%, 100%": { transform: "scale(1);" },
          "50%": { transform: "scale(0.95);" },
        },
        "menu-animation": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(calc(-100% + 64px))" },
        },
        "fade-in-dropdown": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out-dropdown": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
        "subMenu-animation-in": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "subMenu-animation-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-10px)" },
        },
        "card-order-animation": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s linear",
        "fade-out": "fade-out 0.3s linear",
        "pulse-click": "animation-pulse 0.5s linear",
        "menu-animation": "menu-animation 2s linear",
        "subMenu-animation": "subMenu-animation-in 0.1s linear",
        "subMenu-animation-out": "subMenu-animation-out 0.1s linear",
        "fade-in-dropdown": "fade-in-dropdown 0.1s linear",
        "fade-out-dropdown": "fade-out-dropdown 0.1s linear",
        "card-order-animation": "card-order-animation 0.5s linear",
        "animation-modal-fade-in": "fade-in-lef 0.3s linear",
        "animation-modal-fade-out": "fade-out-left 0.3s linear",
        "fade-in-left": "fade-in-left 0.1s linear",
        "fade-out-left": "fade-out-left 0.1s linear",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      boxShadow: {
        bottomBar: "0px -1px 11.6px 0px rgba(0, 0, 0, 0.08)",
      },
      gridTemplateColumns: {
        kanban: "1fr 1px 1fr 1px 1fr",
      },
      colors: {
        background: "#F2F5FA",
        blue: {
          default: "#7B58FF",
        },
        red: {
          "primary-dark": "#B50010",
          default: "#E2272A",
          "primary-light": "#E46B6B",
          "primary-lighter": "#F2BABA",
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
