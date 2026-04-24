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

- `/` -- Landing page with animated particles background, name, and nav links
- `/projects` -- Project grid listing all published projects
- `/projects/[slug]` -- Individual project detail (SSG via `generateStaticParams`)
- `/about` -- About page
- `/contact` -- Contact page

### Key Components

- `particles.tsx` -- Canvas-based particle animation used as background across pages
- `navigation.tsx` -- Client component with intersection observer for scroll-based styling, responsive mobile menu
- `transition_link.tsx` -- Custom Link wrapper with page transition animation
- `project_grid.tsx` -- Grid layout for project cards
- `card.tsx` / `ui/3d-card.tsx` -- Project card components

### Styling

Dark theme (black/zinc palette). Custom Tailwind animations defined in `tailwind.config.ts`: fade-in, title, fade-left, fade-right. Uses `@tailwindcss/typography` plugin. shadcn/ui configured (zinc base color, lucide icons, `@/components/ui` alias).

### External Services

- Vercel Analytics (`@vercel/analytics`)
- Upstash Redis (`@upstash/redis`) -- dependency present but usage not prominent in main pages
