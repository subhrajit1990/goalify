import React, { createContext, useState, useEffect } from "react";

// Create the context
export const ThemeContext = createContext();

// Create the provider
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [font, setFont] = useState(() => {
    return localStorage.getItem("font") || "sans-serif";
  });

  // persist theme + font in localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("font", font);
  }, [font]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, font, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
};