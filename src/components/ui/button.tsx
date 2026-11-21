"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "font-mono font-medium leading-none rounded-none border no-underline",
    "transition-colors duration-fast ease-out",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    "disabled:cursor-not-allowed disabled:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /** The one main action on a screen. */
        primary:
          "border-accent bg-accent text-accent-fg hover:bg-accent/85 active:bg-accent/75",
        /** Everyday actions. */
        secondary:
          "border-line bg-chrome text-fg hover:border-line-strong hover:bg-chrome/70 active:bg-pane",
        /** Low-emphasis actions inside panes and toolbars. */
        ghost:
          "border-transparent bg-transparent text-fg-muted hover:bg-chrome hover:text-fg active:bg-chrome/70",
        /** Irreversible actions. */
        danger:
          "border-ansi-red/70 bg-transparent text-ansi-red hover:bg-ansi-red/10 active:bg-ansi-red/20",
      },
      size: {
        sm: "h-7 px-2.5 text-xs",
        md: "h-9 px-3.5 text-sm",
        lg: "h-11 px-5 text-base",
        icon: "size-9 p-0 text-sm",
      },
      /** Wraps the label in brackets, like a TUI button: [ run ]. */
      bracketed: {
        true: "before:content-['['] before:text-fg-subtle after:content-[']'] after:text-fg-subtle",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "primary", bracketed: true, className: "before:text-accent-fg/70 after:text-accent-fg/70" },
    ],
    defaultVariants: {
      variant: "secondary",
      size: "md",
      bracketed: false,
    },
  },
);

export type ButtonProps = Omit<ComponentPropsWithoutRef<typeof BaseButton>, "className"> &
  VariantProps<typeof buttonVariants> & { className?: string };

/**
 * Base UI Button, styled. For a link that looks like a button, style an
 * <a> or <Link> with `buttonVariants()` instead (Base UI keeps link semantics
 * out of Button on purpose).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, bracketed, ...props },
  ref,
) {
  return (
    <BaseButton
      ref={ref}
      className={cn(buttonVariants({ variant, size, bracketed }), className)}
      {...props}
    />
  );
});
