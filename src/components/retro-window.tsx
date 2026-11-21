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
    variant === "error" ? "border border-ansi-red" :
    "retro-raised";

  const titlebarExtra = variant === "error" ? "text-ansi-red" : "";

  return (
    <section className={`${borderClass} bg-retro-panel ${className}`}>
      <header className={`retro-titlebar ${titlebarExtra}`}>
        <span className="truncate min-w-0 mr-2">&gt; {title.toLowerCase()}</span>
        {showControls && (
          <span className="tracking-wider select-none">[-][□][x]</span>
        )}
      </header>
      <div className="p-3 sm:p-4">{children}</div>
    </section>
  );
}
