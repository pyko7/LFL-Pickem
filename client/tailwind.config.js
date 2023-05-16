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
      borderWidth: {
        1: "1px",
      },
      borderRadius: {
        circle: "50%",
      },
      boxShadow: {
        elevation:
          "0px 8px 10px 1px hsla(0,0%,0%,0.14), 0px 3px 14px 2px hsla(0,0%,0%,0.12), 0px 5px 5px -3px hsla(0,0%,0%,0.2)",
        "elevation-lfl":
          "0px 8px 10px 1px hsla(42,52%,47%,0.14), 0px 3px 14px 2px hsla(42,52%,47%,0.12), 0px 5px 5px -3px hsla(42,52%,47%,0.2)",
        "elevation-divtwo":
          "0px 8px 10px 1px hsla(331,79%,56%,0.14), 0px 3px 14px 2px hsla(331,79%,56%,0.12), 0px 5px 5px -3px hsla(331,79%,56%,0.2)",
      },
    },
  },
  plugins: [],
};
