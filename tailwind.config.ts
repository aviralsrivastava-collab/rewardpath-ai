import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: {
          DEFAULT: "var(--surface)",
          glass: "var(--surface-glass)",
        },
        line: "var(--line)",
        text: {
          DEFAULT: "var(--text)",
          muted: "var(--muted)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          deep: "var(--gold-deep)",
          light: "#f7e5b2",
        },
        violet: {
          DEFAULT: "var(--violet)",
          glow: "rgba(124, 108, 255, 0.25)",
        },
        success: "var(--success)",
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36aaf5",
          500: "#0c8ee6",
          600: "#0070c4",
          700: "#0159a0",
          800: "#064b84",
          900: "#0b3f6e",
          950: "#072849",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Fraunces", "serif"],
        sans: ["var(--font-instrument)", "Instrument Sans", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 30px -5px rgba(231, 195, 111, 0.15)",
        violet: "0 0 30px -5px rgba(124, 108, 255, 0.18)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
        card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float-gentle": "floatGentle 4s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
