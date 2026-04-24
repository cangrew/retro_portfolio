"use client";

import { ReactNode } from "react";
import { useTheme } from "@/lib/theme/theme-provider";

type Variant = "default" | "ridge" | "error";

interface RetroWindowProps {
  title: string;
  variant?: Variant;
  showControls?: boolean;
  children: ReactNode;
  className?: string;
}

export default function RetroWindow({
  title,
  variant = "default",
  showControls = true,
  children,
  className = "",
}: RetroWindowProps) {
  const { theme } = useTheme();

  const borderClass =
    variant === "ridge" ? "retro-ridge" :
    variant === "error" ? "border-2 border-red-500" :
    "retro-raised";

  const titlebarExtra = variant === "error" ? "bg-red-800" : "";

  return (
    <section className={`${borderClass} bg-retro-panel ${className}`}>
      <header className={`retro-titlebar ${titlebarExtra}`}>
        {theme === "arch" ? (
          <>
            <span className="truncate min-w-0 mr-2">&gt; {title.toLowerCase()}</span>
            {showControls && (
              <span className="tracking-wider select-none">[-][□][x]</span>
            )}
          </>
        ) : (
          <>
            <span className="truncate min-w-0 mr-2">■ {title}</span>
            {showControls && (
              <span className="tracking-wider select-none">[_][□][X]</span>
            )}
          </>
        )}
      </header>
      <div className="p-3 sm:p-4">{children}</div>
    </section>
  );
}
