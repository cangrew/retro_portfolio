"use client";

import type { ComponentPropsWithoutRef } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";
import { usePortalContainer } from "./portal-container";

type WithClassName<T> = Omit<T, "className"> & { className?: string };

/** Wrap the app (or a toolbar) once so neighboring tooltips open instantly. */
export function TooltipProvider(props: ComponentPropsWithoutRef<typeof BaseTooltip.Provider>) {
  return <BaseTooltip.Provider delay={400} closeDelay={0} {...props} />;
}

export const Tooltip = BaseTooltip.Root;
export const TooltipTrigger = BaseTooltip.Trigger;

export interface TooltipContentProps extends WithClassName<ComponentPropsWithoutRef<typeof BaseTooltip.Popup>> {
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
}

export function TooltipContent({ side = "top", sideOffset = 6, className, ...props }: TooltipContentProps) {
  const container = usePortalContainer();
  return (
    <BaseTooltip.Portal container={container}>
      <BaseTooltip.Positioner side={side} sideOffset={sideOffset} className="z-50">
        <BaseTooltip.Popup
          className={cn(
            "origin-[var(--transform-origin)] border border-line-strong bg-overlay px-2 py-1 font-mono text-xs text-fg shadow-overlay",
            "transition-[opacity,transform] duration-fast ease-out",
            "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0 data-[instant]:transition-none",
            className,
          )}
          {...props}
        />
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
