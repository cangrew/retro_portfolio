import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Aligned key/value lines, like `kubectl describe` or a neofetch block, minus the logo. */
export function KeyValue({ items, className }: { items: readonly (readonly [ReactNode, ReactNode])[]; className?: string }) {
  return (
    <dl className={cn("grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1 text-sm", className)}>
      {items.map(([k, v], i) => (
        <div key={i} className="contents">
          <dt className="text-fg-subtle">{k}</dt>
          <dd className="min-w-0 text-fg">{v}</dd>
        </div>
      ))}
    </dl>
  );
}
