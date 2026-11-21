"use client";

import { useState, type ReactNode } from "react";
import { Pane } from "@/components/ui/pane";
import { ShellProvider } from "./shell-context";
import { useShortcuts } from "./use-shortcuts";
import { Sidebar } from "./sidebar";
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
 * The site frame, built like a TUI: a sidebar of panels (pages, links), the
 * page in a large panel, and key hints along the bottom. Whichever side holds
 * keyboard focus gets the accent border.
 */
export function AppShell({ index, children }: { index: SearchIndex; children: ReactNode }) {
  const [sidebarFocused, setSidebarFocused] = useState(false);

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
      <div className="grid gap-pane-gap p-pane-gap md:grid-cols-[15rem_minmax(0,1fr)] md:pt-[calc(var(--pane-gap)*1.5)]">
        <aside
          className="sticky top-pane-gap hidden max-h-[calc(100dvh-var(--statusbar)-var(--pane-gap)*2)] self-start overflow-y-auto pt-2 md:block"
          onFocus={() => setSidebarFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setSidebarFocused(false);
          }}
        >
          <Sidebar focused={sidebarFocused} />
        </aside>
        <Pane
          as="div"
          id="content"
          tabIndex={-1}
          title={<PathLabel />}
          focused={!sidebarFocused}
          padding="none"
          className="min-h-[calc(100dvh-var(--statusbar)-var(--pane-gap)*3)] outline-none md:mt-2"
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
