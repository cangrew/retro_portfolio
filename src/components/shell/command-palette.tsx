"use client";

import { useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { Prompt } from "@/components/ui/prompt";
import { useTheme } from "@/lib/theme/theme-provider";
import { PAGES, type SearchIndex } from "./site-map";
import { useShell } from "./shell-context";

const groupClass = cn(
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3",
  "[&_[cmdk-group-heading]]:text-2xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-fg-subtle",
);

function cn(...parts: string[]) {
  return parts.join(" ");
}

function Item({
  value,
  keywords,
  onSelect,
  command,
  label,
  hint,
}: {
  value: string;
  keywords?: string[];
  onSelect: () => void;
  command: ReactNode;
  label?: string;
  hint?: ReactNode;
}) {
  return (
    <Command.Item
      value={value}
      keywords={keywords}
      onSelect={onSelect}
      className="flex cursor-default select-none items-center gap-3 px-3 py-1.5 text-sm text-fg data-[selected=true]:bg-accent data-[selected=true]:text-accent-fg [&[data-selected=true]_.muted]:text-accent-fg/80"
    >
      <span className="shrink-0">{command}</span>
      {label && <span className="muted min-w-0 truncate text-fg-muted">{label}</span>}
      {hint && <span className="muted ml-auto shrink-0 text-xs text-fg-subtle">{hint}</span>}
    </Command.Item>
  );
}

/**
 * The command palette, styled as a shell: type a command or a name, Enter runs it.
 * Opens with ⌘K, Ctrl+K, ":" or "/".
 */
/**
 * Plain substring matching instead of cmdk's fuzzy scoring, which ranks
 * "cd ~/research" first for "cache" because the letters appear in order.
 * A whole-query match ranks above a match on every word.
 */
export function matchCommand(value: string, search: string, keywords?: string[]) {
  const text = `${value} ${keywords?.join(" ") ?? ""}`.toLowerCase();
  const q = search.trim().toLowerCase();
  if (!q) return 1;
  if (text.includes(q)) return text.startsWith(q) ? 1 : 0.8;
  return q.split(/\s+/).every((word) => text.includes(word)) ? 0.5 : 0;
}

export function CommandPalette({ index }: { index: SearchIndex }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { paletteOpen, setPaletteOpen, setHelpOpen, shortcutsEnabled, setShortcutsEnabled } = useShell();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function run(action: () => void) {
    setPaletteOpen(false);
    setQuery("");
    action();
  }
  const go = (href: string) => run(() => router.push(href));

  return (
    <Dialog open={paletteOpen} onOpenChange={(open) => { setPaletteOpen(open); if (!open) setQuery(""); }}>
      <DialogContent
        title="command"
        initialFocus={inputRef}
        className="top-[12vh] w-[40rem] translate-y-0"
        bodyClassName="gap-0 p-0 pt-2"
      >
        <Command label="Command palette" loop filter={matchCommand} className="flex min-h-0 flex-col">
          <div className="flex items-center gap-2 border-b border-line px-3">
            <Prompt aria-hidden className="text-sm" />
            <Command.Input
              ref={inputRef}
              value={query}
              onValueChange={setQuery}
              placeholder="cd projects, open a post, theme light…"
              className="h-11 min-w-0 flex-1 bg-transparent text-sm text-fg caret-accent outline-none placeholder:text-fg-subtle"
            />
          </div>
          <Command.List className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain py-1">
            <Command.Empty className="px-3 py-6 text-sm text-fg-muted">
              zsh: command not found: <span className="text-ansi-red">{query}</span>
            </Command.Empty>

            <Command.Group heading="pages" className={groupClass}>
              {PAGES.map((p) => (
                <Item
                  key={p.href}
                  value={`cd ${p.label}`}
                  keywords={[p.slug]}
                  onSelect={() => go(p.href)}
                  command={<>cd ~{p.href === "/" ? "" : p.href}</>}
                  hint={<Kbd>{p.key}</Kbd>}
                />
              ))}
            </Command.Group>

            {index.projects.length > 0 && (
              <Command.Group heading="projects" className={groupClass}>
                {index.projects.map((p) => (
                  <Item
                    key={p.slug}
                    value={`open project ${p.title} ${p.slug}`}
                    keywords={p.description ? [p.description] : undefined}
                    onSelect={() => go(`/projects/${p.slug}`)}
                    command="open"
                    label={p.title}
                  />
                ))}
              </Command.Group>
            )}

            {index.posts.length > 0 && (
              <Command.Group heading="posts" className={groupClass}>
                {index.posts.map((p) => (
                  <Item
                    key={p.slug}
                    value={`less post ${p.title} ${p.slug}`}
                    onSelect={() => go(`/blog/${p.slug}`)}
                    command="less"
                    label={p.title}
                    hint={p.date}
                  />
                ))}
              </Command.Group>
            )}

            <Command.Group heading="actions" className={groupClass}>
              <Item
                value={`theme ${theme === "light" ? "dark" : "light"}`}
                onSelect={() => run(() => setTheme(theme === "light" ? "dark" : "light"))}
                command={<>theme {theme === "light" ? "dark" : "light"}</>}
                label="switch the color theme"
                hint={shortcutsEnabled ? <Kbd>t</Kbd> : undefined}
              />
              <Item
                value="cat resume.pdf"
                keywords={["cv", "download"]}
                onSelect={() => run(() => window.open("/resume/resume.pdf", "_blank", "noopener"))}
                command="cat resume.pdf"
                label="open the PDF"
              />
              <Item
                value="help keys"
                keywords={["shortcuts", "keyboard"]}
                onSelect={() => run(() => setHelpOpen(true))}
                command="help"
                label="keyboard shortcuts"
                hint={shortcutsEnabled ? <Kbd>?</Kbd> : undefined}
              />
              <Item
                value={`shortcuts ${shortcutsEnabled ? "off" : "on"}`}
                onSelect={() => run(() => setShortcutsEnabled(!shortcutsEnabled))}
                command={<>shortcuts {shortcutsEnabled ? "off" : "on"}</>}
                label={shortcutsEnabled ? "turn off single-key shortcuts" : "turn on single-key shortcuts"}
              />
            </Command.Group>
          </Command.List>
          <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-line px-3 py-1.5 text-2xs text-fg-subtle">
            <span><span className="text-accent">↑↓</span> move</span>
            <span><span className="text-accent">enter</span> run</span>
            <span><span className="text-accent">esc</span> close</span>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
