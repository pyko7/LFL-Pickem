/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-light": "#36414A",
        "main": "#252C32",
        "main-dark": "#0A0E13",
        "secondary": "#B8933A",
        "secondary-light": "#C5A047",
        "neutral-light": "#FFFFFE",
        "neutral": "#9E9E9E",
        "neutral-dark": "#121212",
      },
    },
  },
  plugins: [],
};
