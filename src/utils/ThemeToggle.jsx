import { useState, useMemo, createContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ThemeModeContext = createContext();

const ThemeToggle = ({ children }) => {
  const [mode, setMode] = useState("light");
  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, setMode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeToggle;
