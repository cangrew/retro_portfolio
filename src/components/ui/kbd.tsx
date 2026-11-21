import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** A key or shortcut hint: <Kbd>⌘K</Kbd>. */
export function Kbd({ className, ...props }: ComponentPropsWithoutRef<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center border border-line bg-chrome px-1 font-mono text-2xs font-medium text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}
