import React, { createContext, useContext, ReactNode } from "react";
import { lightColors, darkColors, ThemeColors } from "./colors";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  colors: lightColors,
  setMode: () => {},
});

interface ThemeProviderProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  children: ReactNode;
}

export const ThemeProvider = ({ mode, setMode, children }: ThemeProviderProps) => {
  const colors = mode === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ mode, colors, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
