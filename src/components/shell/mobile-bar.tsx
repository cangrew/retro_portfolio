"use client";

import Link from "next/link";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { MobileDrawer } from "./mobile-drawer";
import { PathLabel } from "./path-label";
import { useShell } from "./shell-context";

/** Phones get a slim top bar: menu, where you are, command palette, theme. */
export function MobileBar() {
  const { setPaletteOpen } = useShell();
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center gap-2 border-b border-line bg-canvas px-pane-gap md:hidden">
      <MobileDrawer />
      <Link href="/" className="min-w-0 flex-1 truncate text-sm no-underline">
        <span className="text-ansi-green">andres</span>
        <span className="text-fg-subtle">:</span>
        <PathLabel className="text-ansi-blue" />
      </Link>
      <ThemeSwitcher className="min-w-0 px-1" />
      <button
        type="button"
        aria-label="Open command palette"
        onClick={() => setPaletteOpen(true)}
        className="inline-flex h-9 items-center border border-line px-2 text-sm text-accent hover:border-line-strong"
      >
        [:]
      </button>
    </header>
  );
}
