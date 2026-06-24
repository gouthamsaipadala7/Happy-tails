/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF914D",
        secondary: "#FFC857",
        accent: "#4CAF50",
        background: "#FFF8F3",
        dark: "#1F2937",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        display: ["'Fraunces'", "serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "2rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(31, 41, 55, 0.08)",
        glow: "0 0 40px rgba(255, 145, 77, 0.25)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        fadeUp: "fadeUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};