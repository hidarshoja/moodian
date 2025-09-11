/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        color1: "#FBFAF6",
        color2: "#5B7380",
        color3: "#31546B",
        color4: "#354D5A",
        // Dark mode colors for crypto theme
        "dark-bg": "#0F1419",
        "dark-card": "#1A1F2E",
        "dark-border": "#2D3748",
        "dark-text": "#E2E8F0",
        "dark-text-secondary": "#A0AEC0",
        "dark-accent": "#00D4AA",
        "dark-accent-hover": "#00B894",
        "dark-danger": "#FF6B6B",
        "dark-success": "#4ECDC4",
        "dark-warning": "#FFE66D",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.3s ease-in-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
