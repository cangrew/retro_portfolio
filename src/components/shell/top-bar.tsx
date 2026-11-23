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
  { label: "resume.pdf", href: "/resume/resume.pdf" },
];

/**
 * The menu, as the top panel of the TUI: the name set into the border, outside
 * links on the right of the border, and the pages as a row of numbered tabs.
 * ←→ or h/l move between tabs; the panel takes the accent border while it
 * holds focus.
 */
export function TopBar({ focused }: { focused: boolean }) {
  const current = pageForPath(usePathname());

  return (
    <Pane
      as="nav"
      aria-label="Pages"
      focused={focused}
      padding="none"
      title={
        <Link href="/" className="font-bold text-fg no-underline hover:text-accent">
          Andres Delgado
        </Link>
      }
      meta={
        <span className="hidden gap-3 xl:flex">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="text-fg-muted no-underline hover:text-fg">
              {l.label} <span aria-hidden className="text-fg-subtle">↗</span>
            </a>
          ))}
        </span>
      }
    >
      <ul className="flex flex-wrap gap-x-1 px-1 pb-1.5 pt-3" onKeyDown={onTabRowKeyDown}>
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
    </Pane>
  );
}
