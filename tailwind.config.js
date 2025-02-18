export default {
  content: ["./src/index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Scan tous les fichiers React
  theme: {
    extend: {
      colors: {
        primary: "#ffffff", // Blanc pur
        secondary: "#f9f9f9", // Blanc plus doux
        gray: "rgba(0, 0, 0, 0.25)", // Gris transparent
        dark: "#111827", // Fond sombre (proche de Tailwind `gray-900`)
        sunFajr: "#FF6B6B",
        sunRise: "#FFD93D",
        sunDhuhr: "#FFE15D",
        sunAsr: "#FFA41B",
        sunMaghrib: "#FF4B4B",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"], // Ajout de la font Poppins pour tout le projet
      },
      boxShadow: {
        inner: "inset 0px 4px 6px rgba(0, 0, 0, 0.3)", // Ombre interne personnalisée
      },
      borderRadius: {
        xl: "50px", // Arrondi personnalisé
      },
      animation: {
        'neon-pulse': 'neonPulse 2s infinite',
        'neon-scan': 'neonScan 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        neonPulse: {
          '0%, 100%': { opacity: 1, filter: 'brightness(1) blur(1px)' },
          '50%': { opacity: 0.6, filter: 'brightness(1.2) blur(2px)' },
        },
        neonScan: {
          '0%': { transform: 'translateX(-50%) rotate(30deg)' },
          '100%': { transform: 'translateX(150%) rotate(30deg)' },
        },
        glowPulse: {
          '0%, 100%': { 
            opacity: 1,
            filter: 'brightness(1.2) blur(5px)',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: 0.8,
            filter: 'brightness(1.5) blur(10px)',
            transform: 'scale(1.05)'
          },
        },
      },
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  "content": [
      "./src/**/*.{js,jsx,ts,tsx}"
  ],
  "theme": {
      "extend": {
          "colors": {
              "whitesmoke": "#f1f1f1",
              "gray": "rgba(0, 0, 0, 0.25)",
              "white": "#fff"
          },
          "spacing": {},
          "fontFamily": {
              "poppins": "Poppins"
          }
      },
      "fontSize": {
          "inherit": "inherit"
      }
  },
  "corePlugins": {
      "preflight": false
  }
}