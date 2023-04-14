/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-light": "#36414A",
        main: "#252C32",
        "main-dark": "#0A0E13",
        lfl: "#B8933A",
        "lfl-light": "#C5A047",
        divtwo: "#e8378c",
        "divtwo-light": "#ea4b97",
      },
      borderRadius: {
        circle: "50%",
      },
    },
  },
  plugins: [],
};
