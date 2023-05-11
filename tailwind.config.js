/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        secondary: "#FFA700",
        bg: "#FFFFFF",
        text: "#333333",
        "dark-text": "#FFFFFF",

        "dark-primary": "#B4D0FF",
        "dark-secondary": "#FFC700",
        "dark-bg": "#333333",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
