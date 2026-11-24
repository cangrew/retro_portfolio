import { cn } from "@/lib/utils";

/** Tags as plain text, separated by spaces. */
export function Tags({ tags, className }: { tags?: readonly string[]; className?: string }) {
  if (!tags?.length) return null;
  return (
    <span className={cn("inline-flex flex-wrap gap-x-2 text-fg-subtle", className)}>
      {tags.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </span>
  );
}
