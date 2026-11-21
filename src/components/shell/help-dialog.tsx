"use client";

import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import { PAGES } from "./site-map";
import { useShell } from "./shell-context";

const ROWS: [keys: string[], action: string][] = [
  [["⌘K", "Ctrl+K"], "command palette"],
  [[":", "/"], "command palette"],
  [[`1-${PAGES.length}`], "jump to a page"],
  [["t"], "switch theme"],
  [["?"], "this help"],
  [["Esc"], "close a dialog"],
];

/** Lists the keyboard shortcuts and lets visitors turn single-key ones off. */
export function HelpDialog() {
  const { helpOpen, setHelpOpen, shortcutsEnabled, setShortcutsEnabled } = useShell();
  return (
    <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
      <DialogContent title="man shortcuts">
        <DialogDescription>The site is keyboard first. Everything also works with a mouse or touch.</DialogDescription>
        <table className="w-full text-sm">
          <tbody className="divide-y divide-line">
            {ROWS.map(([keys, action]) => (
              <tr key={action + keys.join()}>
                <td className="py-1.5 pr-4">
                  <span className="flex flex-wrap gap-1">
                    {keys.map((k) => (
                      <Kbd key={k}>{k}</Kbd>
                    ))}
                  </span>
                </td>
                <td className="py-1.5 text-fg-muted">{action}</td>
              </tr>
            ))}
            <tr>
              <td className="py-1.5 pr-4">
                <span className="flex gap-1">
                  {PAGES.map((p) => (
                    <Kbd key={p.key}>{p.key}</Kbd>
                  ))}
                </span>
              </td>
              <td className="py-1.5 text-fg-muted">{PAGES.map((p) => p.label).join(", ")}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3 text-sm">
          <span className="text-fg-muted">
            Single-key shortcuts are <span className="text-fg">{shortcutsEnabled ? "on" : "off"}</span>.
          </span>
          <Button size="sm" bracketed onClick={() => setShortcutsEnabled(!shortcutsEnabled)}>
            turn {shortcutsEnabled ? "off" : "on"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
