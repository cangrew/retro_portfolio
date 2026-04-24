"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme/theme-provider";

const WORKSPACES = [
  { n: 1, name: "home",     href: "/" },
  { n: 2, name: "projects", href: "/projects" },
  { n: 3, name: "blog",     href: "/blog" },
  { n: 4, name: "research", href: "/research" },
  { n: 5, name: "brain",    href: "/brain" },
  { n: 6, name: "resume",   href: "/resume" },
];

export default function I3StatusBar() {
  const { theme } = useTheme();
  const pathname  = usePathname();

  if (theme !== "arch") return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-retro-panel border-t border-retro-border-lt font-mono flex items-center justify-between px-3 h-6 text-xs">
      <div className="flex items-center gap-0.5">
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
      <div className="flex items-center gap-3 text-retro-fg-dim">
        <span className="text-retro-green">arch</span>
        <span>x86_64</span>
        <span suppressHydrationWarning>
          {new Date().toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}
        </span>
      </div>
    </div>
  );
}
