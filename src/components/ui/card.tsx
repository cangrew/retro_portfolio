import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("flex min-w-0 flex-col gap-3 border border-line bg-canvas p-pane-padding text-fg", {
  variants: {
    /**
     * For cards that are links or contain one main link. The border lights up
     * on hover, and in accent when a link inside has keyboard focus.
     */
    interactive: {
      true: "relative transition-colors duration-fast ease-out hover:border-line-strong hover:bg-chrome/40 focus-within:border-accent",
      false: "",
    },
  },
  defaultVariants: { interactive: false },
});

export interface CardProps extends ComponentPropsWithoutRef<"div">, VariantProps<typeof cardVariants> {
  as?: "div" | "article" | "section";
}

/** A content block without a title bar: project and post summaries. */
export function Card({ interactive, as: Tag = "div", className, ...props }: CardProps) {
  return <Tag className={cn(cardVariants({ interactive }), className)} {...props} />;
}

export function CardHeader({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({
  as: Tag = "h3",
  className,
  ...props
}: ComponentPropsWithoutRef<"h3"> & { as?: "h2" | "h3" | "h4" }) {
  return <Tag className={cn("text-lg font-bold leading-snug text-fg", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("text-sm text-fg-muted", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("text-sm", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mt-auto flex flex-wrap items-center gap-2 border-t border-line pt-3 text-xs text-fg-subtle", className)}
      {...props}
    />
  );
}
