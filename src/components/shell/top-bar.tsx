"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pane } from "@/components/ui/pane";
import { onTabRowKeyDown } from "@/components/ui/row-list";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button-variants";
import { LINK_ICONS, LINK_NAMES, externalProps, isExternal } from "@/components/content/social-links";
import { LINKS } from "@/data/profile";
import { PAGES, pageForPath } from "./site-map";

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
        <ul className="flex shrink-0 items-center gap-1 pr-1" aria-label="Links">
          {LINKS.map((l) => {
            const Icon = LINK_ICONS[l.kind];
            const name = LINK_NAMES[l.kind] + (isExternal(l.href) ? " (opens in a new tab)" : "");
            return (
              <li key={l.kind}>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <a
                        href={l.href}
                        {...externalProps(l.href)}
                        aria-label={name}
                        className={buttonVariants({ variant: "ghost", size: "icon", className: "size-8" })}
                      />
                    }
                  >
                    <Icon aria-hidden />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">{LINK_NAMES[l.kind]}</TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </div>
    </Pane>
  );
}
