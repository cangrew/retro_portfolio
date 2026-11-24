"use client";

import { useState, type ReactNode } from "react";
import { Pane } from "@/components/ui/pane";
import { ShellProvider } from "./shell-context";
import { useShortcuts } from "./use-shortcuts";
import { TopBar } from "./top-bar";
import { KeyHints } from "./key-hints";
import { MobileBar } from "./mobile-bar";
import { CommandPalette } from "./command-palette";
import { HelpDialog } from "./help-dialog";
import type { SearchIndex } from "./site-map";
import { PathLabel } from "./path-label";

function Shortcuts() {
  useShortcuts();
  return null;
}

/**
 * The site frame, built like a TUI: a menu panel across the top (pages as
 * numbered tabs), the page in a large panel below it, and key hints along the
 * bottom. Whichever panel holds keyboard focus gets the accent border.
 */
export function AppShell({ index, children }: { index: SearchIndex; children: ReactNode }) {
  const [navFocused, setNavFocused] = useState(false);

  return (
    <ShellProvider>
      <Shortcuts />
      <a
        href="#content"
        className="sr-only z-50 bg-accent px-3 py-2 text-accent-fg no-underline focus:not-sr-only focus:fixed focus:left-2 focus:top-2"
      >
        Skip to content
      </a>
      <MobileBar />
      <header
        className="sticky top-0 z-40 hidden bg-canvas p-pane-gap lg:block"
        onFocus={() => setNavFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setNavFocused(false);
        }}
      >
        <div className="mx-auto max-w-content">
          <TopBar focused={navFocused} />
        </div>
      </header>
      <div className="mx-auto max-w-content px-pane-gap box-content pb-[calc(var(--pane-gap)*2)] pt-[calc(var(--pane-gap)*1.5)] lg:pt-2">
        <Pane
          as="div"
          id="content"
          tabIndex={-1}
          title={<PathLabel />}
          focused={!navFocused}
          padding="none"
          className="min-h-[calc(100dvh-3rem-var(--statusbar)-var(--pane-gap)*3)] outline-none lg:min-h-[calc(100dvh-7rem-var(--statusbar))]"
        >
          <div className="px-3 pb-6 pt-6 sm:px-pane-padding">{children}</div>
        </Pane>
      </div>
      <KeyHints />
      <CommandPalette index={index} />
      <HelpDialog />
    </ShellProvider>
  );
}
