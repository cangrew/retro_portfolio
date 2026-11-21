"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer } from "@base-ui/react/drawer";
import { cn } from "@/lib/utils";
import { PAGES, pageForPath } from "./site-map";
import { useShell } from "./shell-context";

/** Phone navigation: a panel that slides in from the left and swipes away. */
export function MobileDrawer({ className }: { className?: string }) {
  const { drawerOpen, setDrawerOpen } = useShell();
  const pathname = usePathname();
  const current = pageForPath(pathname);

  return (
    <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen} swipeDirection="left">
      <Drawer.Trigger
        aria-label="Open navigation"
        className={cn(
          "inline-flex h-9 items-center border border-line px-2 text-sm text-accent hover:border-line-strong",
          className,
        )}
      >
        [≡]
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop
          className={cn(
            "fixed inset-0 z-50 bg-[var(--backdrop)]",
            "transition-opacity duration-base ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
          )}
        />
        <Drawer.Viewport className="fixed inset-0 z-50 flex items-stretch justify-start">
          <Drawer.Popup
            className={cn(
              "h-full w-[18rem] max-w-[calc(100vw-3rem)] overflow-y-auto overscroll-contain border-r border-accent bg-pane outline-none",
              "[transform:translateX(var(--drawer-swipe-movement-x))] transition-transform duration-slow ease-out",
              "data-[starting-style]:[transform:translateX(-100%)] data-[ending-style]:[transform:translateX(-100%)]",
            )}
          >
            <Drawer.Content className="flex flex-col">
              <div className="flex items-center gap-2 px-3 pb-1 pt-3 text-xs">
                <Drawer.Title className="shrink-0 font-bold text-accent">pages</Drawer.Title>
                <span aria-hidden className="h-px flex-1 bg-line" />
                <Drawer.Close aria-label="Close navigation" className="-my-2 shrink-0 px-1 py-2 text-fg-subtle hover:text-fg">
                  close
                </Drawer.Close>
              </div>
              <nav aria-label="Pages">
                <ul className="py-1">
                  {PAGES.map((p) => {
                    const active = p === current;
                    return (
                      <li key={p.href}>
                        <Link
                          href={p.href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setDrawerOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-3 py-2.5 text-sm no-underline",
                            active ? "bg-accent font-bold text-accent-fg" : "text-fg hover:bg-chrome",
                          )}
                        >
                          <span>{p.label}</span>
                          <span className={active ? "text-accent-fg/80" : "text-fg-subtle"}>{p.key}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
