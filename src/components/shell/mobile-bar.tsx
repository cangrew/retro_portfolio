"use client";

import { usePathname } from "next/navigation";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { MobileDrawer } from "./mobile-drawer";
import { useShell } from "./shell-context";
import { pageForPath } from "./site-map";

/** Phones get a slim top bar: menu, the current page, theme, command palette. */
export function MobileBar() {
  const { setPaletteOpen } = useShell();
  const page = pageForPath(usePathname());
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center gap-2 border-b border-line bg-canvas px-pane-gap lg:hidden">
      <MobileDrawer />
      <span className="min-w-0 flex-1 truncate text-sm">
        {page && (
          <>
            <span className="text-fg-subtle">{page.key}</span> <span className="font-bold text-fg">{page.label}</span>
          </>
        )}
      </span>
      <ThemeSwitcher className="min-w-0 px-1 md:hidden" />
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
