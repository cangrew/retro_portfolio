import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A labelled example on the /design page, with an optional usage snippet. */
export function Specimen({
  label,
  code,
  className,
  children,
}: {
  label: string;
  code?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-3", className)}>
      <p className="text-xs text-fg-subtle"># {label}</p>
      <div className="flex min-w-0 flex-wrap items-center gap-3">{children}</div>
      {code && (
        <pre tabIndex={0} className="overflow-x-auto border border-line bg-canvas px-3 py-2 text-xs text-fg-muted">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}

/** A page section with a prompt-style heading and an anchor. */
export function DesignSection({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-20 space-y-5">
      <div className="space-y-2">
        <h2 id={`${id}-title`} className="text-xl font-bold text-fg">
          {title}
        </h2>
        {intro && <div className="max-w-prose text-sm text-fg-muted">{intro}</div>}
      </div>
      {children}
    </section>
  );
}
