"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { usePortalContainer } from "./portal-container";

type WithClassName<T> = Omit<T, "className"> & { className?: string };

export const Dialog = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;

export interface DialogContentProps extends Omit<WithClassName<ComponentPropsWithoutRef<typeof BaseDialog.Popup>>, "title"> {
  /** Shown in the title bar and used as the dialog's accessible name. */
  title: ReactNode;
  /** Hide the [x] close control (keep a DialogClose somewhere else). */
  hideClose?: boolean;
  /** Classes for the body under the title bar (padding, gap). */
  bodyClassName?: string;
}

/** A modal panel: accent border with the title and [x] set into it, dimmed backdrop. */
export function DialogContent({
  title,
  hideClose = false,
  className,
  bodyClassName,
  children,
  ...props
}: DialogContentProps) {
  const container = usePortalContainer();
  return (
    <BaseDialog.Portal container={container}>
      <BaseDialog.Backdrop
        className={cn(
          "fixed inset-0 z-50 bg-[var(--backdrop)]",
          "transition-opacity duration-base ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        )}
      />
      <BaseDialog.Popup
        className={cn(
          "fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100dvh-4rem)] w-[32rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col",
          "border border-accent bg-overlay text-fg shadow-overlay outline-none",
          "transition-[opacity,transform] duration-base ease-out",
          "data-[starting-style]:scale-[0.98] data-[starting-style]:opacity-0",
          "data-[ending-style]:scale-[0.98] data-[ending-style]:opacity-0",
          className,
        )}
        {...props}
      >
        <div className="absolute inset-x-2 top-0 flex -translate-y-1/2 items-center justify-between gap-3 text-xs">
          <BaseDialog.Title className="min-w-0 truncate bg-overlay px-1 font-bold leading-none text-accent">
            {title}
          </BaseDialog.Title>
          {!hideClose && (
            <BaseDialog.Close
              aria-label="Close"
              className="bg-overlay px-1 leading-none text-fg-subtle hover:text-ansi-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              [x]
            </BaseDialog.Close>
          )}
        </div>
        <div className={cn("flex min-h-0 flex-col gap-4 overflow-y-auto p-pane-padding pt-6", bodyClassName)}>{children}</div>
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export function DialogDescription({
  className,
  ...props
}: WithClassName<ComponentPropsWithoutRef<typeof BaseDialog.Description>>) {
  return <BaseDialog.Description className={cn("text-sm text-fg-muted", className)} {...props} />;
}

export function DialogFooter({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-wrap justify-end gap-2 pt-2", className)} {...props} />;
}
