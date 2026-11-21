import type { ReactNode } from "react";

/** The top of a page: a plain title and one line of context. The pane border already shows the path. */
export function PageHeader({ title, children, actions }: { title: ReactNode; children?: ReactNode; actions?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="min-w-0 space-y-1">
        <h1 className="text-2xl font-bold text-fg">{title}</h1>
        {children && <p className="max-w-prose text-fg-muted">{children}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  );
}
