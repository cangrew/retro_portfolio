import GithubSlugger from "github-slugger";

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

/** Markdown inline syntax that does not appear in a heading's rendered text. */
function plain(heading: string) {
  return heading
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/\s+#+\s*$/, "")
    .trim();
}

/**
 * The ## and ### headings of a Markdown document, with the ids rehype-slug
 * gives them (same slugger, same order, so duplicate titles get the same -1, -2).
 * Fenced code and display math are skipped.
 */
export function tableOfContents(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let fence: string | null = null;
  for (const line of markdown.split("\n")) {
    const trimmed = line.trim();
    const marker = /^(`{3,}|~{3,}|\$\$)/.exec(trimmed)?.[1];
    // Display math on one line: $$ x $$.
    if (marker === "$$" && fence === null && trimmed.length > 4 && trimmed.endsWith("$$")) continue;
    if (marker) {
      if (fence === null) fence = marker[0] === "$" ? "$$" : marker;
      else if (trimmed.startsWith(fence)) fence = null;
      continue;
    }
    if (fence) continue;
    const m = /^(#{1,6})\s+(.+)$/.exec(line);
    if (!m) continue;
    const text = plain(m[2]);
    const id = slugger.slug(text);
    const depth = m[1].length;
    if (depth === 2 || depth === 3) entries.push({ id, text, depth });
  }
  return entries;
}
