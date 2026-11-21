"use client";

import { createContext, useContext } from "react";

/**
 * Where popups (dialogs, menus, tooltips) portal to. Defaults to <body>.
 * A ThemeScope sets it to itself so popups inherit the scoped theme.
 */
export const PortalContainerContext = createContext<HTMLElement | null>(null);

export function usePortalContainer(): HTMLElement | undefined {
  return useContext(PortalContainerContext) ?? undefined;
}
