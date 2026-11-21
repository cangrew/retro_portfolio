import type { ReactNode } from "react";
import { Pane } from "@/components/ui/pane";

type Variant = "default" | "ridge" | "error";

interface RetroWindowProps {
  title: string;
  variant?: Variant;
  /** Ignored. Kept so legacy pages compile until they are rebuilt on Pane. */
  showControls?: boolean;
  children: ReactNode;
  className?: string;
}

/**
 * Legacy wrapper kept until each page is rebuilt. It now renders a Pane, so
 * old pages pick up the TUI panel style (title set into the border, no fake
 * window controls). New code should use Pane directly.
 */
export default function RetroWindow({ title, variant = "default", children, className }: RetroWindowProps) {
  return (
    <Pane title={title.toLowerCase()} tone={variant === "error" ? "danger" : "default"} className={className}>
      {children}
    </Pane>
  );
}
