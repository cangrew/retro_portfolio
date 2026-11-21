"use client";

import Link from "next/link";
import { onRowListKeyDown } from "@/components/ui/row-list";
import { usePathname } from "next/navigation";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";
import { PAGES, pageForPath } from "./site-map";

const LINKS = [
  { label: "github", href: "https://github.com/cangrew", external: true },
  { label: "linkedin", href: "https://linkedin.com/in/andresddelgado", external: true },
  { label: "resume.pdf", href: "/resume/resume.pdf", external: true },
  { label: "email", href: "/contact", external: false },
];

/** Arrow keys (and j/k) move between links in a list, like a TUI list view. */
const rowClass = "flex items-center justify-between gap-3 px-2 py-0.5 text-sm no-underline outline-none";

export function Sidebar({ focused }: { focused: boolean }) {
  const pathname = usePathname();
  const current = pageForPath(pathname);

  return (
    <div className="flex flex-col gap-pane-gap">
      <Link href="/" className="block px-1 pb-1 pt-1 no-underline">
        <span className="block text-lg font-bold leading-tight text-fg">Andres Delgado</span>
        <span className="block text-xs text-fg-muted">computer architecture · UCF</span>
      </Link>

      <Pane as="nav" aria-label="Pages" title="pages" focused={focused} padding="none" footer={current ? `${current.key} of ${PAGES.length}` : undefined}>
        <ul className="py-3" onKeyDown={onRowListKeyDown}>
          {PAGES.map((p) => {
            const active = p === current;
            return (
              <li key={p.href}>
                <Link
                  href={p.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    rowClass,
                    "mx-1",
                    active ? "bg-accent font-bold text-accent-fg" : "text-fg hover:bg-chrome focus-visible:bg-chrome",
                    "focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-accent",
                  )}
                >
                  <span>{p.label}</span>
                  <span aria-hidden className={active ? "text-accent-fg/80" : "text-fg-subtle"}>
                    {p.key}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Pane>

      <Pane as="div" title="links" padding="none">
        <ul className="py-3" onKeyDown={onRowListKeyDown}>
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={cn(
                  rowClass,
                  "mx-1 text-fg-muted hover:bg-chrome hover:text-fg focus-visible:bg-chrome focus-visible:text-fg",
                  "focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-accent",
                )}
              >
                <span>{l.label}</span>
                {l.external && <span aria-hidden className="text-fg-subtle">↗</span>}
              </a>
            </li>
          ))}
        </ul>
      </Pane>
    </div>
  );
}
