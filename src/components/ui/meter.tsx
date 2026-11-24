import { cn } from "@/lib/utils";

/** A text meter like htop's: [||||||||||······] 70%. */
export function Meter({ label, value, cells = 20, className }: { label: string; value: number; cells?: number; className?: string }) {
  const filled = Math.round((Math.min(100, Math.max(0, value)) / 100) * cells);
  return (
    <div
      role="meter"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("flex items-baseline gap-3 whitespace-nowrap text-sm", className)}
    >
      <span className="w-28 shrink-0 truncate text-fg">{label}</span>
      <span aria-hidden className="min-w-0 overflow-hidden">
        <span className="text-fg-subtle">[</span>
        <span className="text-accent">{"|".repeat(filled)}</span>
        <span className="text-line-strong">{"·".repeat(cells - filled)}</span>
        <span className="text-fg-subtle">]</span>
      </span>
      <span aria-hidden className="w-10 shrink-0 text-right text-fg-muted">{value}%</span>
    </div>
  );
}
