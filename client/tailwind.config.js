/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-light": "#36414A",
        main: "#252C32",
        "main-dark": "#0A0E13",
        secondary: "#B8933A",
        "secondary-light": "#C5A047",
        "neutral-light": "#FFFFFE",
      },
      borderRadius: {
        circle: "50%",
      },
      grayscale: {
        30: "30%",
        75: "75%",
      },
      keyframes: {
        centerFirstTeamLogo: {
          from: {},
          to: {
            top: "50%",
            right: "50%",
            transform: " translate(50%,-50%)",
          },
        },
        centerSecondTeamLogo: {
          from: {},
          to: {
            top: "50%",
            left: "50%",
            transform: " translate(-50%,-50%)",
          },
        },
        slideLogoToLeft: {
          from: {},
          to: {
            left: "12px",
          },
        },
        slideLogoToRight: {
          from: {},
          to: {
            right: "12px",
          },
        },
      },
      animation: {
        centerFirstTeamLogo: "centerFirstTeamLogo 1s ease-out forwards",
        centerSecondTeamLogo: "centerSecondTeamLogo 1s ease-out forwards",
        slideLogoToLeft: "slideLogoToLeft .5s ease-in-out forwards",
        slideLogoToRight: "slideLogoToRight .5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
