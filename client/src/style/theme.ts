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
});
