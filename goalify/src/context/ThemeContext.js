import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light"); // light by default
  const [font, setFont] = useLocalStorage("font", "Arial");

  const value = { theme, setTheme, font, setFont };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`app-theme ${theme}`} style={{ fontFamily: font }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}