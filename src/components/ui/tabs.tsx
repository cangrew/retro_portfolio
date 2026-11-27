"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

type WithClassName<T> = Omit<T, "className"> & { className?: string };

/** Tabs drawn like a tmux window list: 1:overview 2:projects. */
export function Tabs({ className, ...props }: WithClassName<ComponentPropsWithoutRef<typeof BaseTabs.Root>>) {
  return <BaseTabs.Root className={cn("flex min-w-0 flex-col", className)} {...props} />;
}

export function TabsList({ className, ...props }: WithClassName<ComponentPropsWithoutRef<typeof BaseTabs.List>>) {
  return (
    <BaseTabs.List
      className={cn("flex min-w-0 items-stretch gap-px overflow-x-auto border-b border-line", className)}
      {...props}
    />
  );
}

export interface TabsTabProps extends WithClassName<ComponentPropsWithoutRef<typeof BaseTabs.Tab>> {
  /** Window number shown before the label, as in tmux. */
  index?: number;
  children: ReactNode;
}

export function TabsTab({ className, index, children, ...props }: TabsTabProps) {
  return (
    <BaseTabs.Tab
      className={cn(
        "group inline-flex h-8 shrink-0 items-center whitespace-nowrap px-3 font-mono text-sm text-fg-muted",
        "transition-colors duration-instant hover:bg-chrome hover:text-fg",
        "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent",
        "data-[active]:bg-accent data-[active]:text-accent-fg",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      {index != null && <span className="text-fg-subtle group-data-[active]:text-accent-fg">{index}:</span>}
      {children}
    </BaseTabs.Tab>
  );
}

export function TabsPanel({ className, ...props }: WithClassName<ComponentPropsWithoutRef<typeof BaseTabs.Panel>>) {
  return (
    <BaseTabs.Panel
      className={cn(
        "pt-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
      {...props}
    />
  );
}
