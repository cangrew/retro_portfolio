# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server with Turbopack (localhost:3000)
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
npm run build:content # Build contentlayer2 content (currently unused, see below)
```

## Architecture

Personal portfolio site for Andres Delgado (andresddelgado.com) -- Next.js 15 App Router, React 19, TypeScript, Tailwind CSS 3.

### Content System

Project content lives in `content/projects/*.mdx` files with frontmatter (title, description, date, url, published, private). The content is parsed at build time by `src/util/mdx.ts` using `gray-matter` -- **not** contentlayer2. The `contentlayer.config.ts` and contentlayer imports are vestigial/unused; the actual content directory is `content/projects/` (not `src/content/projects/` as contentlayer config states).

MDX body content is rendered client-side via `react-markdown` in `src/components/md-content.tsx`.

### Routing

- `/` -- Home: name, recent projects and posts, profile
- `/projects` -- Project grid listing all published projects
- `/projects/[slug]` -- Individual project detail (SSG via `generateStaticParams`)
- `/about` -- About page
- `/contact` -- Contact page

### Key Components

- `shell/` -- The site frame (see Site shell below)
- `content/` -- Page building blocks: `PageHeader`, `Category`, `Tags`, and `prose-styles.ts` (Markdown classes shared by `md-content.tsx` and `src/mdx-components.tsx`)
- `md-content.tsx` -- Renders project and post Markdown with react-markdown
- `brain-scene.tsx` -- three.js wireframe brain on /brain; colors come from the theme tokens

### Styling

Tailwind utilities generated from the design tokens only; there are no legacy `retro-*` classes, fonts or animations left. Uses `@tailwindcss/typography` plugin.

### Design system

The terminal design system is the root of every page; see `/design` for the live reference.

- Tokens: `src/design-system/tokens.ts` (colors per theme, type scale, layout, motion). `tailwind.config.ts` turns them into CSS variables and utilities (`bg-pane`, `text-fg-muted`, `border-accent`, `duration-fast`). Do not hard-code hex colors; add a token.
- Themes: `dark` (default) and `light`, switched by next-themes via `data-theme` on `<html>` (`src/lib/theme/theme-provider.tsx`). The Win95 theme is retired.
- Font: JetBrains Mono only, with ligatures (`src/lib/fonts.ts`).
- Components: `src/components/ui` (Button, Pane, PaneGrid, Section, RowList, KeyValue, Meter, Badge, Tabs, Dialog, Tooltip, Menu, Kbd, ThemeSwitcher), built on Base UI and styled with cva.
- Class strings that server components need (`buttonVariants`, `rowClass`) live in files without "use client" (`button-variants.ts`, `row-styles.ts`). Importing a value from a "use client" module into a server component gives a client reference, not the value.
- `tokens.test.ts` enforces WCAG AA contrast for every text color.
- Style: borrow the component style of TUI tools (panels with the title set into the border, accent border on the focused panel, the menu as a top panel of tabs, key hints along the bottom). Never fake app chrome such as window controls or imitation git panels.
- Inside a pane, split content with `Section` (a rule with the title set in), list things with `RowList` rows and a `bg-chrome` header row, and show facts with `KeyValue`. No nested boxes, cards, bevels, glows, marquees, shell-prompt headings or `[x]` corners; popups close with esc, shown as a hint in the bottom border.

### Site shell

`src/components/shell`, mounted once in `src/app/layout.tsx` via `AppShell`:

- `site-map.ts` -- Pages and their number keys (1-8), `shellPath()`, the palette's `SearchIndex` type.
- `top-bar.tsx` (the menu: a panel across the top with the name in its border, outside links on the right of the border, and pages as numbered tabs; ←→ or h/l move between tabs; shown from `lg`), `mobile-bar.tsx` + `mobile-drawer.tsx` (Base UI Drawer, below `lg`), `key-hints.tsx` (bottom bar).
- `command-palette.tsx` -- cmdk inside a Dialog; `:`, `/`, Cmd/Ctrl+K. Uses substring matching (`matchCommand`), not cmdk's fuzzy score.
- `use-shortcuts.ts` -- Global keys. Single-key shortcuts can be turned off (WCAG 2.1.4), stored in localStorage `shortcuts`; Cmd/Ctrl+K always works.
- `help-dialog.tsx` -- The `?` key table.
- `path-label.tsx` -- Prints the current path; remounts after hydration because the 404 page renders as `/_not-found` on the server.
- Page transitions: `src/app/template.tsx` (motion), client navigations only, respects reduced motion.
- Pages render a bare `<main>`; the shell supplies the frame and padding.

### External Services

- Vercel Analytics (`@vercel/analytics`)
- Upstash Redis (`@upstash/redis`) -- dependency present but usage not prominent in main pages
