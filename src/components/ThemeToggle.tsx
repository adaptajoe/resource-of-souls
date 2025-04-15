"use client";

import { Moon, Sun } from "@phosphor-icons/react/dist/ssr";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="bg-gray-700 text-white hover:bg-red-600 hover:text-white transition-colors p-4 py-3 rounded-xl" aria-label="Toggle theme">
      {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
