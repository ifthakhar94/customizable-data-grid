import React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

const createMyTheme = (colors, fontSizes) => {
  return createTheme({
    palette: {
      primary: { main: colors.primary || "#1976D2" },
      secondary: { main: colors.secondary || "#DC004E" },
      text: {
        primary: colors.textPrimary || "#333333",
        secondary: colors.textSecondary || "#666666",
      },
    },
    typography: {
      h1: { fontSize: fontSizes.headlineLg },
      h2: { fontSize: fontSizes.headlineMd },
      h3: { fontSize: fontSizes.headlineSm },
      body1: { fontSize: fontSizes.bodyXl },
      body2: { fontSize: fontSizes.bodyLg },
      body3: { fontSize: fontSizes.bodyMd },
      body4: { fontSize: fontSizes.bodySm },
      body5: { fontSize: fontSizes.bodyXs },
    },
  });
};

const ThemeProvider = ({ children, colors = {}, fontSizes = {} }) => {
  const theme = createMyTheme(colors, fontSizes);

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
