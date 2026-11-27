import type { TocEntry } from "@/util/toc";
import { cn } from "@/lib/utils";

/** "On this page": links to a document's headings, ### indented under ##. */
export function TableOfContents({ entries, className }: { entries: TocEntry[]; className?: string }) {
  if (entries.length < 2) return null;
  return (
    <nav aria-label="On this page" className={cn("text-sm", className)}>
      <ol className="space-y-1.5 border-l border-line">
        {entries.map((e) => (
          <li key={e.id} className={e.depth === 3 ? "pl-6" : "pl-3"}>
            <a
              href={`#${e.id}`}
              className={cn(
                "block py-0.5 no-underline hover:text-fg",
                e.depth === 3 ? "text-xs text-fg-subtle" : "text-fg-muted",
              )}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
