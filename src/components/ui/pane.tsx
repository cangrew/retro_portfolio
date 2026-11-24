import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * A TUI panel: a 1px box on the page background with its title set into the
 * top border, like the panels in lazygit or k9s. The focused panel's border
 * and title turn accent.
 */

const paneVariants = cva("relative flex min-w-0 flex-col border bg-canvas text-fg", {
  variants: {
    focused: {
      true: "border-accent",
      false: "border-line",
    },
    tone: {
      default: "",
      danger: "",
    },
  },
  compoundVariants: [{ tone: "danger", focused: false, className: "border-ansi-red" }],
  defaultVariants: { focused: false, tone: "default" },
});

const bodyVariants = cva("min-w-0 flex-1", {
  variants: {
    padding: {
      none: "",
      sm: "px-3 pb-3 pt-4",
      md: "p-pane-padding pt-5",
    },
  },
  defaultVariants: { padding: "md" },
});

/** The label that sits on a border: title on the top edge, meta on the right or bottom. */
const legend = "bg-canvas px-1 leading-none";

export interface PaneProps
  extends Omit<ComponentPropsWithoutRef<"section">, "title">,
    VariantProps<typeof paneVariants>,
    VariantProps<typeof bodyVariants> {
  /** Set into the top border, e.g. "projects" or "~/blog". Omit for a bare box. */
  title?: ReactNode;
  /** Hotkey shown before the title as [1]. */
  index?: number | string;
  /** Set into the top border on the right: a count, a sort order. */
  meta?: ReactNode;
  /** Set into the bottom border on the right: a position like "3 of 10". */
  footer?: ReactNode;
  as?: "section" | "div" | "article" | "aside" | "nav";
}

export function Pane({
  title,
  index,
  meta,
  footer,
  focused,
  tone,
  padding,
  as: Tag = "section",
  className,
  children,
  ...props
}: PaneProps) {
  const titleId = useId();
  const accent = focused ? "text-accent" : tone === "danger" ? "text-ansi-red" : "text-fg-muted";
  return (
    <Tag
      aria-labelledby={title != null && !props["aria-label"] ? titleId : undefined}
      data-focused={focused ? "" : undefined}
      className={cn(paneVariants({ focused, tone }), className)}
      {...props}
    >
      {(title != null || meta != null) && (
        <div className="pointer-events-none absolute inset-x-2 top-0 flex -translate-y-1/2 items-center justify-between gap-3 text-xs">
          {title != null ? (
            <span id={titleId} className={cn(legend, "pointer-events-auto min-w-0 truncate", accent, focused && "font-bold")}>
              {index != null && <span className={focused ? "" : "text-fg-subtle"}>[{index}]─</span>}
              {title}
            </span>
          ) : (
            <span />
          )}
          {meta != null && <span className={cn(legend, "pointer-events-auto shrink-0 text-fg-subtle")}>{meta}</span>}
        </div>
      )}
      <div className={bodyVariants({ padding })}>{children}</div>
      {footer != null && (
        <span className={cn(legend, "absolute bottom-0 right-2 translate-y-1/2 text-xs text-fg-subtle")}>{footer}</span>
      )}
    </Tag>
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

/** Tiles panes with even gaps. Columns collapse to one on small screens. */
export function PaneGrid({ cols, className, ...props }: PaneGridProps) {
  return <div className={cn(gridVariants({ cols }), className)} {...props} />;
}
