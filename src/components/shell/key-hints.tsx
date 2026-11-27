"use client";

import type { ReactNode } from "react";
import { PAGES } from "./site-map";
import { useShell } from "./shell-context";

function Hint({ k, children, onClick }: { k: string; children: ReactNode; onClick?: () => void }) {
  const body = (
    <>
      <span className="text-accent">{k}</span> {children}
    </>
  );
  return onClick ? (
    <button type="button" onClick={onClick} className="whitespace-nowrap hover:text-fg focus-visible:outline focus-visible:outline-1 focus-visible:outline-accent">
      {body}
    </button>
  ) : (
    <span className="whitespace-nowrap">{body}</span>
  );
}

const Sep = () => <span aria-hidden className="text-line-strong">|</span>;

/** The bottom bar: what the keys do, as a TUI shows them. Hints that are actions are clickable. */
export function KeyHints() {
  const { setPaletteOpen, setHelpOpen, shortcutsEnabled } = useShell();
  return (
    <footer aria-label="Keyboard hints" className="fixed inset-x-0 bottom-0 z-40 hidden h-statusbar border-t border-line bg-canvas px-pane-gap text-2xs text-fg-subtle md:block">
      <div className="mx-auto flex h-full max-w-content items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-2 overflow-hidden">
        {shortcutsEnabled ? (
          <>
            <Hint k={`1-${PAGES.length}`}>pages</Hint>
            <Sep />
            <Hint k="←→ ↑↓">move</Hint>
            <Sep />
            <Hint k=":" onClick={() => setPaletteOpen(true)}>command</Hint>
            <Sep />
            <Hint k="?" onClick={() => setHelpOpen(true)}>help</Hint>
          </>
        ) : (
          <>
            <Hint k="⌘K" onClick={() => setPaletteOpen(true)}>command</Hint>
            <Sep />
            <Hint k="help" onClick={() => setHelpOpen(true)}>shortcuts are off</Hint>
          </>
        )}
      </div>
      </div>
    </footer>
  );
}
