"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { ThemeName } from "./types";
import { DEFAULT_THEME, STORAGE_KEY } from "./types";

interface ThemeContextValue {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(DEFAULT_THEME);

  useEffect(() => {
    const attr = document.documentElement.dataset.theme as ThemeName | undefined;
    if (attr === "arch" || attr === "win95") setThemeState(attr);
  }, []);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {}
  };

  const toggleTheme = () => setTheme(theme === "win95" ? "arch" : "win95");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
