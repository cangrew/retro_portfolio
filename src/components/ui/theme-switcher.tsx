"use client";

import { useTheme } from "@/lib/theme/theme-provider";
import { THEMES } from "@/design-system/tokens";
import { Button } from "./button";
import { cn } from "@/lib/utils";

/** Cycles through the themes. Shows the current one, like `theme: dark`. */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const next = THEMES[(THEMES.indexOf(theme ?? THEMES[0]) + 1) % THEMES.length];
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(next)}
      className={cn("min-w-[11ch] justify-start", className)}
    >
      <span className="text-fg-subtle">theme:</span>
      {/* Unknown until mounted; keep the width stable. */}
      <span>{theme ?? "…"}</span>
      {/* The visible text starts the accessible name (WCAG 2.5.3); this says what a press does. */}
      <span className="sr-only">, switch to {next}</span>
    </Button>
  );
}
