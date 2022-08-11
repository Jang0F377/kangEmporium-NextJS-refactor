/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dodger-blue": "#0496ff",
        "dodger-blue-dark": "#066ab2",
        "dodger-blue-light": "#9cd4fc",
        "honolulu-blue": "#006ba6",
        "dark-saturated-blue": "#26272F",
        "background-primary": "#1f1f38",
        "background-variant": "#2c2c6c",
        "color-primary": "#4db5ff",
        "color-primary-variant": "rgba(77,181,255,0.4)",
        "color-light": "rgba(255, 255, 255, 0.6)",
        "purple-navy": "#4f518c",
      },
      fontFamily: {
        inter: ["Inter var", "sans"],
      },
      backgroundImage: {
        main: "url(/bg-texture.png)",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
