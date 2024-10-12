// context/ThemeProvider.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext(); // Create context

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Apply the theme class on body or main div
  useEffect(() => {
    document.body.className = theme; // Alternatively, you can use a wrapper div
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easier access to theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider'); // Helpful error message
  }
  return context;
};
