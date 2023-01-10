import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      light: "#36414A",
      main: "#252C32",
      dark: "#0A0E13",
    },
    secondary: {
      main: "#B8933A",
    },
    neutral: {
      light: "#FFFFFE",
      main: "#9E9E9E",
      dark: "#121212",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          caretColor: "#0A0E13",
          borderRadius: 8,
          backgroundColor: "#fffffe",
          "& label": {
            color: "#36414A",
            fontWeight: 700,
          },
          "& label.Mui-focused": {
            color: "#36414A",
          },
          "& .MuiFilledInput-root": {
            overflow: "hidden",
            borderRadius: 6,
          },
          "& .MuiFilledInput-underline::after ": {
            margin: "0,auto",
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "#36414A",
        },
      },
    },
  },
});
