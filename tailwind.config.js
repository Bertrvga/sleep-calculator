/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        night: {
          950: "#05060f",
          900: "#0a0b1e",
          800: "#111327",
          700: "#1a1d38",
          600: "#252a4d",
        },
        moon: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
        },
        star: {
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
        },
      },
      backgroundImage: {
        "night-gradient":
          "radial-gradient(ellipse at top, #1e1b4b 0%, #0a0b1e 45%, #05060f 100%)",
        "card-gradient":
          "linear-gradient(145deg, rgba(139,92,246,0.08) 0%, rgba(56,189,248,0.04) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(139, 92, 246, 0.25)",
        "glow-cyan": "0 0 30px rgba(56, 189, 248, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
