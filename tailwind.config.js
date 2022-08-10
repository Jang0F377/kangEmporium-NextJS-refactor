/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-primary": "#1f1f38",
        "background-variant": "#2c2c6c",
        "color-primary": "#4db5ff",
        "color-primary-variant": "rgba(77,181,255,0.4)",
        "color-light": "rgba(255, 255, 255, 0.6)",
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
