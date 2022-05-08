module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { transform: "translateX(0%)" },
          "50%": { transform: "translateX(50%)" },
          "100%": { transform: "translateX(100%)" },
        },
        slider: {
          "0%": { transform: "translateX(0)" },
          "100%": {
            transform: "translateX(calc(-250px * 10))",
          },
        },
      },
      animation: {
        "waving-hand": "wave 20s linear infinite",
        "slider-img": "slider 50s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar-hide")],
};
