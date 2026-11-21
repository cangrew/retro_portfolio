"use client";

import { usePathname } from "next/navigation";

const WORKSPACES = [
  { n: 1, name: "home",     href: "/" },
  { n: 2, name: "projects", href: "/projects" },
  { n: 3, name: "blog",     href: "/blog" },
  { n: 4, name: "research", href: "/research" },
  { n: 5, name: "brain",    href: "/brain" },
  { n: 6, name: "resume",   href: "/resume" },
];

export default function I3StatusBar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-chrome border-t border-line font-mono flex items-center justify-between gap-3 overflow-hidden px-3 h-statusbar text-2xs">
      <div className="flex min-w-0 items-center gap-0.5 overflow-hidden">
        {WORKSPACES.map(({ n, name, href }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <span
              key={n}
              className={`px-1.5 ${
                active
                  ? "bg-retro-green text-retro-bg font-bold"
                  : "text-retro-fg-dim"
              }`}
            >
              {n}:{name}
            </span>
          );
        })}
      </div>
      <div className="hidden sm:flex shrink-0 items-center gap-3 text-retro-fg-dim">
        <span className="text-retro-green">arch</span>
        <span>x86_64</span>
        <span suppressHydrationWarning>
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
