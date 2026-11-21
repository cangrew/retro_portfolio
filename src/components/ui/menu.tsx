"use client";

import type { ComponentPropsWithoutRef } from "react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";
import { usePortalContainer } from "./portal-container";

type WithClassName<T> = Omit<T, "className"> & { className?: string };

export const Menu = BaseMenu.Root;
export const MenuTrigger = BaseMenu.Trigger;
export const MenuGroup = BaseMenu.Group;
export const MenuRadioGroup = BaseMenu.RadioGroup;

export interface MenuContentProps extends WithClassName<ComponentPropsWithoutRef<typeof BaseMenu.Popup>> {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export function MenuContent({ side = "bottom", align = "start", sideOffset = 4, className, ...props }: MenuContentProps) {
  const container = usePortalContainer();
  return (
    <BaseMenu.Portal container={container}>
      <BaseMenu.Positioner side={side} align={align} sideOffset={sideOffset} className="z-50 outline-none">
        <BaseMenu.Popup
          className={cn(
            "min-w-[12rem] origin-[var(--transform-origin)] border border-line-strong bg-overlay py-1 font-mono text-sm text-fg shadow-overlay outline-none",
            "transition-[opacity,transform] duration-base ease-out",
            "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
            className,
          )}
          {...props}
        />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

const itemClass = cn(
  "flex cursor-default select-none items-center gap-2 px-3 py-1.5 outline-none no-underline text-fg",
  "data-[highlighted]:bg-accent data-[highlighted]:text-accent-fg",
  "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
);

export function MenuItem({ className, ...props }: WithClassName<ComponentPropsWithoutRef<typeof BaseMenu.Item>>) {
  return <BaseMenu.Item className={cn(itemClass, className)} {...props} />;
}

/** A menu item that navigates. Pass `render={<Link href="…" />}` for client routing. */
export function MenuLinkItem({ className, ...props }: WithClassName<ComponentPropsWithoutRef<typeof BaseMenu.LinkItem>>) {
  return <BaseMenu.LinkItem className={cn(itemClass, className)} {...props} />;
}

export function MenuCheckboxItem({
  className,
  children,
  ...props
}: WithClassName<ComponentPropsWithoutRef<typeof BaseMenu.CheckboxItem>>) {
  return (
    <BaseMenu.CheckboxItem className={cn(itemClass, className)} {...props}>
      <span aria-hidden className="inline-flex w-[3ch] shrink-0 opacity-80">
        [<span className="inline-block w-[1ch]"><BaseMenu.CheckboxItemIndicator>x</BaseMenu.CheckboxItemIndicator></span>]
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

export function MenuRadioItem({
  className,
  children,
  ...props
}: WithClassName<ComponentPropsWithoutRef<typeof BaseMenu.RadioItem>>) {
  return (
    <BaseMenu.RadioItem className={cn(itemClass, className)} {...props}>
      <span aria-hidden className="inline-flex w-[3ch] shrink-0 opacity-80">
        (<span className="inline-block w-[1ch]"><BaseMenu.RadioItemIndicator>*</BaseMenu.RadioItemIndicator></span>)
      </span>
      {children}
    </BaseMenu.RadioItem>
  );
}

export function MenuGroupLabel({ className, ...props }: WithClassName<ComponentPropsWithoutRef<typeof BaseMenu.GroupLabel>>) {
  return <BaseMenu.GroupLabel className={cn("px-3 pb-1 pt-2 text-2xs uppercase tracking-wider text-fg-subtle", className)} {...props} />;
}

export function MenuSeparator({ className, ...props }: WithClassName<ComponentPropsWithoutRef<typeof BaseMenu.Separator>>) {
  return <BaseMenu.Separator className={cn("my-1 h-px bg-line", className)} {...props} />;
}
