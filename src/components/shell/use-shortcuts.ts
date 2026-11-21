"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/lib/theme/theme-provider";
import { PAGES } from "./site-map";
import { useShell } from "./shell-context";

function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || target.isContentEditable;
}

/**
 * Global keyboard shortcuts.
 * - ⌘K / Ctrl+K: command palette (always on)
 * - : or /: command palette
 * - 1-8: jump to a page
 * - t: switch theme
 * - ?: keyboard help
 * Single-key shortcuts are skipped while typing, while a dialog is open, or when turned off.
 */
export function useShortcuts() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { paletteOpen, setPaletteOpen, helpOpen, setHelpOpen, drawerOpen, shortcutsEnabled } = useShell();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
        return;
      }
      if (!shortcutsEnabled || e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented) return;
      if (paletteOpen || helpOpen || drawerOpen || isTyping(e.target)) return;
      if (document.querySelector('[role="dialog"], [role="menu"]')) return;

      const page = PAGES.find((p) => p.key === e.key);
      if (page) {
        e.preventDefault();
        router.push(page.href);
        return;
      }
      switch (e.key) {
        case ":":
        case "/":
          e.preventDefault();
          setPaletteOpen(true);
          break;
        case "?":
          e.preventDefault();
          setHelpOpen(true);
          break;
        case "t":
          e.preventDefault();
          setTheme(theme === "light" ? "dark" : "light");
          break;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router, theme, setTheme, paletteOpen, setPaletteOpen, helpOpen, setHelpOpen, drawerOpen, shortcutsEnabled]);
}
