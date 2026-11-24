"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const SHORTCUTS_KEY = "shortcuts";

interface ShellState {
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  helpOpen: boolean;
  setHelpOpen: (open: boolean) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  /** Single-key shortcuts (1-8, t, ?, :) can be turned off, per WCAG 2.1.4. */
  shortcutsEnabled: boolean;
  setShortcutsEnabled: (on: boolean) => void;
}

const ShellContext = createContext<ShellState | null>(null);

export function ShellProvider({ children }: { children: ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shortcutsEnabled, setEnabled] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(SHORTCUTS_KEY) === "off") setEnabled(false);
    } catch {}
  }, []);

  const setShortcutsEnabled = useCallback((on: boolean) => {
    setEnabled(on);
    try {
      localStorage.setItem(SHORTCUTS_KEY, on ? "on" : "off");
    } catch {}
  }, []);

  const value = useMemo(
    () => ({
      paletteOpen,
      setPaletteOpen,
      helpOpen,
      setHelpOpen,
      drawerOpen,
      setDrawerOpen,
      shortcutsEnabled,
      setShortcutsEnabled,
    }),
    [paletteOpen, helpOpen, drawerOpen, shortcutsEnabled, setShortcutsEnabled],
  );

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}

export function useShell(): ShellState {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used inside <ShellProvider>");
  return ctx;
}
