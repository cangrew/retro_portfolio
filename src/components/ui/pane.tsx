import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paneVariants = cva("flex min-w-0 flex-col border bg-pane text-fg", {
  variants: {
    /** A focused pane gets the accent border, like the active window in i3. */
    focused: {
      true: "border-accent",
      false: "border-line",
    },
    tone: {
      default: "",
      danger: "border-ansi-red",
    },
  },
  defaultVariants: { focused: false, tone: "default" },
});

const bodyVariants = cva("min-w-0 flex-1", {
  variants: {
    padding: {
      none: "",
      sm: "p-3",
      md: "p-pane-padding",
    },
  },
  defaultVariants: { padding: "md" },
});

export interface PaneProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title">,
    VariantProps<typeof paneVariants>,
    VariantProps<typeof bodyVariants> {
  /** Shown in the title bar, e.g. "~/projects" or "zsh". Omit for a bare pane. */
  title?: ReactNode;
  /** Right side of the title bar: window controls, a count, actions. */
  meta?: ReactNode;
  as?: "section" | "div" | "article" | "aside";
}

/** A terminal window: thin border, optional title bar, padded body. */
export function Pane({
  title,
  meta,
  focused,
  tone,
  padding,
  as: Tag = "section",
  className,
  children,
  ...props
}: PaneProps) {
  const titleId = useId();
  const hasHeader = title != null || meta != null;
  return (
    <Tag
      aria-labelledby={title != null ? titleId : undefined}
      data-focused={focused ? "" : undefined}
      className={cn(paneVariants({ focused, tone }), className)}
      {...props}
    >
      {hasHeader && (
        <header
          className={cn(
            "flex h-pane-header shrink-0 items-center justify-between gap-3 border-b bg-chrome px-3 text-xs",
            focused ? "border-accent" : tone === "danger" ? "border-ansi-red" : "border-line",
          )}
        >
          <span
            id={titleId}
            className={cn(
              "min-w-0 truncate",
              focused ? "text-accent" : tone === "danger" ? "text-ansi-red" : "text-fg-muted",
            )}
          >
            {title}
          </span>
          {meta != null && <span className="flex shrink-0 items-center gap-2 text-fg-subtle">{meta}</span>}
        </header>
      )}
      <div className={bodyVariants({ padding })}>{children}</div>
    </Tag>
  );
}

/** Decorative window controls for a pane title bar. */
export function PaneControls() {
  return (
    <span aria-hidden className="select-none tracking-wider">
      [-][□][x]
    </span>
  );
}

const gridVariants = cva("grid gap-pane-gap", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    },
  },
  defaultVariants: { cols: 2 },
});

export interface PaneGridProps extends ComponentPropsWithoutRef<"div">, VariantProps<typeof gridVariants> {}

/** Tiles panes with i3-style gaps. Columns collapse to one on small screens. */
export function PaneGrid({ cols, className, ...props }: PaneGridProps) {
  return <div className={cn(gridVariants({ cols }), className)} {...props} />;
}
