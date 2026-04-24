import Link from "next/link";
import { ReactNode } from "react";

type NeonColor = "green" | "cyan" | "magenta" | "amber";

interface NeonButtonProps {
  href?: string;
  onClick?: () => void;
  color?: NeonColor;
  children: ReactNode;
  className?: string;
  external?: boolean;
}

const COLOR_CLASSES: Record<NeonColor, string> = {
  green:   "text-retro-green   hover:shadow-retro-green",
  cyan:    "text-retro-cyan    hover:shadow-retro-cyan",
  magenta: "text-retro-magenta hover:shadow-retro-magenta",
  amber:   "text-retro-amber   hover:shadow-retro-amber",
};

const BASE =
  "retro-raised bg-retro-panel-alt font-pixel text-pixel-xs px-4 py-2 no-underline inline-block transition-none active:retro-inset cursor-pointer";

export default function NeonButton({
  href,
  onClick,
  color = "green",
  children,
  className = "",
  external = false,
}: NeonButtonProps) {
  const classes = `${BASE} ${COLOR_CLASSES[color]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
