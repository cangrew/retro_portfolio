import { Fragment } from "react";
import { cn } from "@/lib/utils";

/** Tags as plain text, separated by a dot so multi-word tags stay readable. */
export function Tags({ tags, className }: { tags?: readonly string[]; className?: string }) {
  if (!tags?.length) return null;
  return (
    <span className={cn("text-fg-subtle", className)}>
      {tags.map((t, i) => (
        <Fragment key={t}>
          {i > 0 && <span aria-hidden> · </span>}
          <span>{t}</span>
        </Fragment>
      ))}
    </span>
  );
}
