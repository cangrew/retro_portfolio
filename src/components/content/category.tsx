import type { ProjectCategory } from "@/util/types";
import { cn } from "@/lib/utils";

const TONE: Record<ProjectCategory, string> = {
  personal: "text-ansi-cyan",
  research: "text-ansi-magenta",
  professional: "text-ansi-yellow",
};

/** A project's category as colored text, the way a TUI colors a column. */
export function Category({ category, className }: { category: ProjectCategory; className?: string }) {
  return <span className={cn(TONE[category], className)}>{category}</span>;
}
