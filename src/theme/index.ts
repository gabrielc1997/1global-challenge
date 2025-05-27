import { createTheme, ThemeOptions } from "@mui/material/styles";

const getDesignTokens = (mode: "light" | "dark"): ThemeOptions => ({
  palette: {
    mode,
    background: {
      default: mode === "light" ? "#F4F6F8" : "#121218",
      paper: mode === "light" ? "#FFFFFF" : "#1E1E2F",
    },
    primary: {
      main: mode === "light" ? "#1E1E2F" : "#FFFFFF",
      contrastText: mode === "light" ? "#FFFFFF" : "#1E1E2F",
    },
    secondary: {
      main: mode === "light" ? "#4B5563" : "#AAB2C5",
    },
    text: {
      primary: mode === "light" ? "#1E1E2F" : "#FFFFFF",
      secondary: mode === "light" ? "#4B5563" : "#AAB2C5",
    },
  },
  spacing: 8,
  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontSize: "2rem", fontWeight: 700, lineHeight: "40px" },
    h2: { fontSize: "1.5rem", fontWeight: 700, lineHeight: "32px" },
    h3: { fontSize: "1.25rem", fontWeight: 600, lineHeight: "28px" },
    h4: { fontSize: "1rem", fontWeight: 600, lineHeight: "24px" },
    h5: { fontSize: "0.875rem", fontWeight: 500, lineHeight: "20px" },
    h6: { fontSize: "0.875rem", fontWeight: 500, lineHeight: "20px" },
    body1: { fontSize: "1rem", lineHeight: "24px" },
    body2: { fontSize: "0.875rem", lineHeight: "20px" },
    button: {
      fontSize: "1rem",
      fontWeight: 600,
      lineHeight: "20px",
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export const getTheme = (mode: "light" | "dark") =>
  createTheme(getDesignTokens(mode));
