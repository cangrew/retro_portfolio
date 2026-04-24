"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "./transition_link";
import { useTheme } from "@/lib/theme/theme-provider";

const NAV_LINKS = [
  { name: "PROJECTS", slug: "projects", href: "/projects" },
  { name: "BLOG",     slug: "blog",     href: "/blog" },
  { name: "RESEARCH", slug: "research", href: "/research" },
  { name: "BRAIN",    slug: "brain",    href: "/brain" },
  { name: "RESUME",   slug: "resume",   href: "/resume" },
  { name: "ABOUT",    slug: "about",    href: "/about" },
  { name: "CONTACT",  slug: "contact",  href: "/contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();
  const pathname  = usePathname();

  if (theme === "arch") {
    return (
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="bg-retro-panel border-b border-retro-border-lt">
          <div className="flex items-center justify-between px-3 py-1.5">
            <TransitionLink
              href="/"
              className="font-mono text-sm text-retro-green no-underline hover:text-retro-cyan"
              aria-label="Home"
            >
              andres@arch ~
            </TransitionLink>

            {/* Desktop workspace links */}
            <div className="hidden md:flex items-center gap-1 font-mono text-xs">
              {NAV_LINKS.map((link, i) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2 py-1 no-underline transition-none ${
                      active
                        ? "bg-retro-green text-retro-bg"
                        : "text-retro-fg-dim hover:text-retro-fg"
                    }`}
                  >
                    {i + 1}:{link.slug}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="md:hidden font-mono text-sm text-retro-green px-2 py-1 border border-retro-border-lt cursor-pointer min-h-[44px]"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? "[x]" : "[≡]"}
              </button>
            </div>
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-retro-panel border-b border-retro-border-lt absolute top-full left-0 right-0">
            <div className="border-b border-retro-border-lt px-3 py-1 font-mono text-xs text-retro-fg-dim">
              $ ls ~/nav/
            </div>
            <ul className="p-2 space-y-0.5">
              {NAV_LINKS.map((link, i) => {
                const active = pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block font-mono text-sm no-underline px-3 py-2 ${
                        active
                          ? "text-retro-green"
                          : "text-retro-fg hover:text-retro-cyan"
                      }`}
                    >
                      {i + 1}:{link.slug}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </header>
    );
  }

  /* ── Win95 nav ── */
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="retro-raised bg-retro-panel">
        <div className="flex items-center justify-between px-3 py-2">
          <TransitionLink
            href="/"
            className="font-pixel text-pixel-xs text-retro-green no-underline hover:text-retro-cyan"
            aria-label="Home"
          >
            ■ ANDRES.EXE
          </TransitionLink>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="retro-raised bg-retro-panel-alt font-pixel text-pixel-xs text-retro-fg no-underline px-3 py-1 hover:text-retro-cyan transition-none"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="retro-raised bg-retro-panel-alt font-pixel text-pixel-xs text-retro-green px-3 py-2.5 cursor-pointer min-h-[44px]"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? "[X]" : "[≡]"}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden retro-raised bg-retro-panel absolute top-full left-0 right-0">
          <div className="retro-titlebar">
            <span>■ START MENU</span>
            <span className="select-none">[X]</span>
          </div>
          <ul className="p-2 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="retro-raised bg-retro-panel-alt block font-pixel text-pixel-xs text-retro-fg no-underline px-3 py-2 hover:text-retro-cyan"
                >
                  ▶ {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
