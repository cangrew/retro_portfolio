"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { DEFAULT_THEME, THEMES, THEME_STORAGE_KEY, type ThemeName } from "@/design-system/tokens";

/**
 * The site renders in the dark theme only (there is no switcher). next-themes
 * still sets `data-theme` on <html>, which /design's light specimens rely on.
 * It It sets `data-theme` on <html> before the
 * first paint, so there is no flash and no hand-written inline script.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      themes={[...THEMES]}
      defaultTheme={DEFAULT_THEME}
      // The site is dark only; a visitor's old saved "light" choice is ignored.
      forcedTheme={DEFAULT_THEME}
      enableSystem={false}
      storageKey={THEME_STORAGE_KEY}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

function isThemeName(value: string | undefined): value is ThemeName {
  return (THEMES as readonly string[]).includes(value ?? "");
}

/**
 * The active theme, typed. `theme` is undefined until mounted on the client,
 * because the server cannot know what the visitor picked.
 */
export function useTheme(): { theme: ThemeName | undefined; setTheme: (t: ThemeName) => void } {
  const { resolvedTheme, setTheme } = useNextTheme();
  // Report nothing until mounted so the first client render matches the server.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return {
    theme: mounted && isThemeName(resolvedTheme) ? resolvedTheme : undefined,
    setTheme,
  };
}
