"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pane } from "@/components/ui/pane";
import { onTabRowKeyDown } from "@/components/ui/row-list";
import { cn } from "@/lib/utils";
import { PAGES, pageForPath } from "./site-map";

const LINKS = [
  { label: "github", href: "https://github.com/cangrew" },
  { label: "linkedin", href: "https://linkedin.com/in/andresddelgado" },
  { label: "resume", href: "/resume/resume.pdf" },
];

/**
 * The menu, as the top panel of the TUI: the pages as a row of numbered tabs,
 * outside links on the right.
 * ←→ or h/l move between tabs; the panel takes the accent border while it
 * holds focus.
 */
export function TopBar({ focused }: { focused: boolean }) {
  const current = pageForPath(usePathname());

  return (
    <Pane as="nav" aria-label="Pages" focused={focused} padding="none">
      <div className="flex items-center justify-between gap-4 px-1 py-1.5">
        <ul className="flex flex-wrap gap-x-1" onKeyDown={onTabRowKeyDown}>
          {PAGES.map((p) => {
            const active = p === current;
            return (
              <li key={p.href}>
                <Link
                  href={p.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-baseline gap-1.5 px-2 py-1 text-sm no-underline outline-none",
                    active ? "bg-accent font-bold text-accent-fg" : "text-fg hover:bg-chrome focus-visible:bg-chrome",
                    "focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-accent",
                  )}
                >
                  <span aria-hidden className={active ? "text-accent-fg" : "text-fg-subtle"}>
                    {p.key}
                  </span>
                  {p.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="hidden shrink-0 gap-4 pr-2 text-sm xl:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-fg-muted no-underline hover:text-fg">
                {l.label}{" "}
                <span aria-hidden className="text-fg-subtle">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Pane>
  );
}
