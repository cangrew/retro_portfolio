"use client";

import { useTheme } from "@/lib/theme/theme-provider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="retro-raised bg-retro-panel-alt font-pixel text-pixel-xs text-retro-green px-3 py-2.5 cursor-pointer min-h-[44px] hover:text-retro-cyan"
      aria-label={`Switch to ${theme === "win95" ? "Arch Linux" : "Win95"} theme`}
      aria-pressed={theme === "arch"}
    >
      {theme === "win95" ? "[ARCH]" : "[WIN95]"}
    </button>
  );
}
