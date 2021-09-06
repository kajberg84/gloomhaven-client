// ThemeContext.js

import React, { createContext, useState, useEffect } from "react";
export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("gloomieThemeColor") || "dark";
    }
  });

  // Setting users Theme to localstorage
  function setUserThemeColor(themeColor) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("gloomieThemeColor", themeColor);
    } else {
      window.localStorage.removeItem("gloomieThemeColor");
    }
  }
  // Updating  if changed/refreshed
  useEffect(() => {
    setUserThemeColor(themeColor);
  }, [themeColor]);

  return (
    <ThemeContext.Provider
      value={{
        gloomUserTheme: [themeColor, setThemeColor],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
