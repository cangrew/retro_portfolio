"use client";

import { useState, type ReactNode } from "react";
import type { ThemeName } from "@/design-system/tokens";
import { PortalContainerContext } from "@/components/ui/portal-container";
import { cn } from "@/lib/utils";

/**
 * Renders its children in a fixed theme, whatever the page theme is. Popups
 * opened inside portal into the scope, so they match it too.
 */
export function ThemeScope({
  theme,
  className,
  children,
}: {
  theme: ThemeName;
  className?: string;
  children: ReactNode;
}) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  return (
    <div ref={setNode} data-theme={theme} className={cn("bg-canvas text-fg", className)}>
      <PortalContainerContext.Provider value={node}>{children}</PortalContainerContext.Provider>
    </div>
  );
}
