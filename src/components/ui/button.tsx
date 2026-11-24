"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Button as BaseButton } from "@base-ui/react/button";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button-variants";
import { cn } from "@/lib/utils";

export { buttonVariants };

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
