import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "lekhankan-theme";

export const CHART_COLORS = {
  light: [
    "#059669",
    "#2563eb",
    "#d97706",
    "#7c3aed",
    "#dc2626",
    "#0891b2",
  ],
  dark: [
    "#34d399",
    "#60a5fa",
    "#fbbf24",
    "#a78bfa",
    "#f87171",
    "#22d3ee",
  ],
};

export const CHART_STYLES = {
  light: {
    grid: "#e2e8f0",
    axis: "#64748b",
    primary: "#059669",
  },
  dark: {
    grid: "#334155",
    axis: "#94a3b8",
    primary: "#34d399",
  },
};

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isDark: theme === "dark",
        chartColors: CHART_COLORS[theme],
        chartStyles: CHART_STYLES[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}
