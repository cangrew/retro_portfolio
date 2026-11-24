import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends Omit<ComponentPropsWithoutRef<"section">, "title"> {
  title: ReactNode;
  /** Right end of the rule: a count, a sort order. */
  meta?: ReactNode;
}

/**
 * A titled block inside a pane, drawn as a rule with the title set into it:
 * ─ publications ──────────── 3 total. The TUI way to split one panel.
 */
export function Section({ title, meta, className, children, ...props }: SectionProps) {
  const id = useId();
  return (
    <section aria-labelledby={id} className={cn("min-w-0", className)} {...props}>
      <div className="mb-3 flex items-center gap-2 text-xs">
        <span aria-hidden className="h-px w-3 shrink-0 bg-line" />
        <h2 id={id} className="shrink-0 font-bold text-fg">
          {title}
        </h2>
        <span aria-hidden className="h-px min-w-4 flex-1 bg-line" />
        {meta != null && <span className="shrink-0 text-fg-subtle">{meta}</span>}
      </div>
      {children}
    </section>
  );
}
