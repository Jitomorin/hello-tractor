// themes.js
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext("light");

export const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme]: any = useState("light");

  const toggleTheme: any = () => {
    setTheme((prevTheme: any) => (prevTheme === "light" ? "dark" : "light"));
    console.log(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
