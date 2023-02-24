/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-light": "#36414A",
        main: "#252C32",
        "main-dark": "#0A0E13",
        secondary: "#B8933A",
        "secondary-light": "#C5A047",
        "neutral-light": "#FFFFFE",
        neutral: "#9E9E9E",
        "neutral-dark": "#121212",
      },
      borderRadius: {
        circle: "50%",
      },
      grayscale: {
        30: "30%",
        75: "75%",
      },
      keyframes: {
        hideFirstTeamName: {
          from: { opacity: 1, },
          to: { opacity: 0, transform: " translateX(-100%)" },
        },
        hideSecondTeamName: {
          from: { opacity: 1 },
          to: { opacity: 0, transform: " translateX(100%)" },
        },
        showFirstTeamName: {
          from: { opacity: 0, transform: " translateX(-100%)" },
          to: { opacity: 1 },
        },
        showSecondTeamName: {
          from: { opacity: 0, transform: " translateX(100%)" },
          to: { opacity: 1 },
        },
      },
      animation: {
        hideFirstTeamName: "hideFirstTeamName 2s ease-in  forwards",
        hideSecondTeamName: "hideSecondTeamName 2s ease-in  forwards",
        showFirstTeamName: "showFirstTeamName 2s ease-in  forwards",
        showSecondTeamName: "showSecondTeamName 2s ease-in  forwards",
      },
    },
  },
  plugins: [],
};
