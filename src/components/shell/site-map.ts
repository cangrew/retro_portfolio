/** Top-level pages, in hotkey order: pressing 1 opens home, 2 projects, and so on. */
export const PAGES = [
  { key: "1", slug: "home", href: "/", label: "home" },
  { key: "2", slug: "projects", href: "/projects", label: "projects" },
  { key: "3", slug: "blog", href: "/blog", label: "blog" },
  { key: "4", slug: "contact", href: "/contact", label: "contact" },
] as const;

export type Page = (typeof PAGES)[number];

/** Sections of the homepage the command palette can jump to. */
export const HOME_SECTIONS = ["about", "experience", "research", "projects", "writing", "education", "skills"] as const;

/** The page a path belongs to: "/projects/foo" → projects. */
export function pageForPath(pathname: string): Page | undefined {
  if (pathname === "/") return PAGES[0];
  return PAGES.find((p) => p.href !== "/" && (pathname === p.href || pathname.startsWith(`${p.href}/`)));
}

/** A shell-style path for the current URL: "/projects/foo" → "~/projects/foo". */
export function shellPath(pathname: string): string {
  return pathname === "/" ? "~" : `~${pathname.replace(/\/$/, "")}`;
}

/** Content the command palette can jump to. Built on the server from the MDX files. */
export interface SearchIndex {
  projects: { slug: string; title: string; description?: string }[];
  posts: { slug: string; title: string; date: string }[];
}
