import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#080808",
        charcoal: "#11100F",
        stone: "#37322E",
        limestone: "#81766B",
        blood: "#520D12",
        crimson: "#7A111A",
        burgundy: "#2B080C",
        gold: "#B59255",
        brass: "#8E6A36",
        ivory: "#E7DDCC",
        parchment: "#C8B89E"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-serif", "Georgia", "serif"]
      },
      boxShadow: {
        aureate: "0 0 0 1px rgba(181,146,85,.28), 0 24px 80px rgba(0,0,0,.45)"
      }
    }
  },
  plugins: []
};

export default config;
