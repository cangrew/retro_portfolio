import { ReactNode } from "react";

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
  const borderClass =
    variant === "ridge" ? "retro-ridge" :
    variant === "error" ? "border-2 border-red-500" :
    "retro-raised";

  const titlebarExtra = variant === "error" ? "bg-red-800" : "";

  return (
    <section className={`${borderClass} bg-retro-panel ${className}`}>
      <header className={`retro-titlebar ${titlebarExtra}`}>
        <span>■ {title}</span>
        {showControls && (
          <span className="tracking-wider select-none">[_][□][X]</span>
        )}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}
