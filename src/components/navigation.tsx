"use client";

import Link from "next/link";
import { useState } from "react";
import TransitionLink from "./transition_link";

const navLinks = [
  { name: "PROJECTS", href: "/projects" },
  { name: "BLOG",     href: "/blog" },
  { name: "RESEARCH", href: "/research" },
  { name: "RESUME",   href: "/resume" },
  { name: "ABOUT",    href: "/about" },
  { name: "CONTACT",  href: "/contact" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Main bar */}
      <nav className="retro-raised bg-retro-panel">
        <div className="flex items-center justify-between px-3 py-2">
          {/* Brand */}
          <TransitionLink
            href="/"
            className="font-pixel text-pixel-xs text-retro-green no-underline hover:text-retro-cyan"
            aria-label="Home"
          >
            ■ ANDRES.EXE
          </TransitionLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="retro-raised bg-retro-panel-alt font-pixel text-pixel-xs text-retro-fg no-underline px-3 py-1 hover:text-retro-cyan transition-none"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden retro-raised bg-retro-panel-alt font-pixel text-pixel-xs text-retro-green px-3 py-1 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "[X]" : "[≡]"}
          </button>
        </div>
      </nav>

      {/* Mobile START MENU */}
      {menuOpen && (
        <div className="md:hidden retro-raised bg-retro-panel absolute top-full left-0 right-0">
          <div className="retro-titlebar">
            <span>■ START MENU</span>
            <span className="select-none">[X]</span>
          </div>
          <ul className="p-2 space-y-1">
            {navLinks.map((link) => (
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
