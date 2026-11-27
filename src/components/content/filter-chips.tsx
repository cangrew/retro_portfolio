"use client";

import { cn } from "@/lib/utils";

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

/**
 * A row of toggle buttons that filter a list, like the scope switch in a TUI
 * file picker. One is active at a time; `null` is "all".
 */
export function FilterChips({
  label,
  options,
  value,
  onChange,
  allLabel = "all",
  total,
  className,
}: {
  /** Names the group for screen readers, e.g. "Filter by topic". */
  label: string;
  options: FilterOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  allLabel?: string;
  total: number;
  className?: string;
}) {
  const items: { value: string | null; label: string; count: number }[] = [{ value: null, label: allLabel, count: total }, ...options];
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value ?? "__all"}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(active ? null : o.value)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 border px-2.5 font-mono text-xs transition-colors duration-fast",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              active
                ? "border-accent bg-accent text-accent-fg"
                : "border-line bg-transparent text-fg-muted hover:border-line-strong hover:bg-chrome hover:text-fg",
            )}
          >
            {o.label}
            <span className={active ? "text-accent-fg" : "text-fg-subtle"}>{o.count}</span>
          </button>
        );
      })}
    </div>
  );
}
