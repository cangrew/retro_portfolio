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
  /** Hide the "esc close" control in the bottom border (keep a DialogClose somewhere else). */
  hideClose?: boolean;
  /** Key hints set into the bottom border on the left, e.g. "↑↓ move". */
  hints?: ReactNode;
  /** Classes for the body (padding, gap). */
  bodyClassName?: string;
}

/**
 * A modal panel, like a TUI popup: accent border with the title set into the
 * top edge and the close key hint ("esc close") set into the bottom edge.
 */
export function DialogContent({
  title,
  hideClose = false,
  hints,
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
        <BaseDialog.Title className="absolute left-2 top-0 max-w-[calc(100%-1rem)] -translate-y-1/2 truncate bg-overlay px-1 text-xs font-bold leading-none text-accent">
          {title}
        </BaseDialog.Title>
        <div className={cn("flex min-h-0 flex-col gap-4 overflow-y-auto p-pane-padding pb-5 pt-6", bodyClassName)}>{children}</div>
        {hints != null && (
          <span className="absolute bottom-0 left-2 translate-y-1/2 bg-overlay px-1 text-xs leading-none text-fg-subtle">
            {hints}
          </span>
        )}
        {!hideClose && (
          <BaseDialog.Close
            aria-label="Close"
            className="absolute bottom-0 right-2 translate-y-1/2 bg-overlay px-1 text-xs leading-none text-fg-subtle hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span className="text-accent">esc</span> close
          </BaseDialog.Close>
        )}
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
