"use client";

import { useState } from "react";
import type { ThemeName } from "@/design-system/tokens";
import { ThemeScope } from "@/components/theme/theme-scope";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge, BADGE_TONES } from "@/components/ui/badge";
import { Pane, PaneGrid } from "@/components/ui/pane";
import { useShell } from "@/components/shell/shell-context";
import { Section } from "@/components/ui/section";
import { KeyValue } from "@/components/ui/key-value";
import { Meter } from "@/components/ui/meter";
import { RowList } from "@/components/ui/row-list";
import { rowClass, rowMuted, rowSubtle } from "@/components/ui/row-styles";
import { Kbd } from "@/components/ui/kbd";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { Specimen } from "./specimen";

function MenuDemo() {
  const [sort, setSort] = useState("date");
  const [showPrivate, setShowPrivate] = useState(false);
  return (
    <Menu>
      <MenuTrigger className={buttonVariants({ variant: "secondary", size: "sm" })}>sort: {sort} ▾</MenuTrigger>
      <MenuContent>
        <MenuGroup>
          <MenuGroupLabel>sort by</MenuGroupLabel>
          <MenuRadioGroup value={sort} onValueChange={(v) => setSort(String(v))}>
            <MenuRadioItem value="date">date</MenuRadioItem>
            <MenuRadioItem value="title">title</MenuRadioItem>
            <MenuRadioItem value="category">category</MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
        <MenuSeparator />
        <MenuCheckboxItem checked={showPrivate} onCheckedChange={setShowPrivate}>
          show private repos
        </MenuCheckboxItem>
        <MenuSeparator />
        <MenuItem>
          copy link <Kbd className="ml-auto">⌘C</Kbd>
        </MenuItem>
        <MenuItem disabled>export (soon)</MenuItem>
      </MenuContent>
    </Menu>
  );
}

function ShellSpecimen() {
  const { setPaletteOpen, setHelpOpen } = useShell();
  return (
    <Specimen label="Shell: command palette and key help (also : and ?)">
      <Button size="sm" bracketed onClick={() => setPaletteOpen(true)}>
        command
      </Button>
      <Button size="sm" variant="ghost" onClick={() => setHelpOpen(true)}>
        help
      </Button>
    </Specimen>
  );
}

function Gallery() {
  return (
    <div className="space-y-pane-gap">
      <Pane title="button.tsx">
        <div className="space-y-5">
          <Specimen label="variants" code={`<Button variant="primary">deploy</Button>`}>
            <Button variant="primary">deploy</Button>
            <Button variant="secondary">open</Button>
            <Button variant="ghost">cancel</Button>
            <Button variant="danger">rm -rf</Button>
          </Specimen>
          <Specimen label="sizes and states" code={`<Button size="sm" bracketed>run</Button>`}>
            <Button size="sm" bracketed>
              run
            </Button>
            <Button size="md" bracketed variant="primary">
              run
            </Button>
            <Button size="lg">large</Button>
            <Button size="icon" aria-label="Close">
              ×
            </Button>
            <Button disabled>disabled</Button>
          </Specimen>
          <Specimen label="link styled as a button" code={`<Link className={buttonVariants({ variant: "secondary" })} />`}>
            <a href="#components" className={buttonVariants({ variant: "secondary", size: "sm" })}>
              projects
            </a>
          </Specimen>
        </div>
      </Pane>

      <Pane title="badge.tsx">
        <div className="space-y-5">
          {(["outline", "solid", "bracket"] as const).map((variant) => (
            <Specimen key={variant} label={variant} code={variant === "outline" ? `<Badge tone="magenta">research</Badge>` : undefined}>
              {BADGE_TONES.map((tone) => (
                <Badge key={tone} tone={tone} variant={variant}>
                  {variant === "bracket" ? tone.toUpperCase() : tone}
                </Badge>
              ))}
            </Specimen>
          ))}
        </div>
      </Pane>

      <Pane title="content">
        <div className="space-y-6">
          <Specimen label="Section" code={`<Section title="publications" meta="3 total">…</Section>`}>
            <Section title="publications" meta="3 total" className="w-full">
              <p className="text-sm text-fg-muted">A rule with the title set in. Splits one pane without nesting boxes.</p>
            </Section>
          </Specimen>
          <Specimen label="RowList" code={`<RowList><li><Link className={rowClass}>…</Link></li></RowList>`}>
            <div className="w-full">
              <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-3 bg-chrome px-2 py-1 text-xs font-bold text-fg-muted">
                <span>date</span>
                <span>name</span>
              </div>
              <RowList className="mx-2">
                {[
                  ["2025-03", "Cache_Simulator", "multi-level cache hierarchy simulator"],
                  ["2024-11", "gem5_pmo", "persistent memory objects in gem5"],
                ].map(([date, name, desc]) => (
                  <li key={name}>
                    <a href="#components" className={`${rowClass} grid grid-cols-[4.5rem_minmax(0,1fr)]`}>
                      <span className={rowSubtle}>{date}</span>
                      <span className="truncate">
                        {name} <span className={rowMuted}>{desc}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </RowList>
              <p className="mt-2 text-xs text-fg-subtle">Tab into the list, then ↑↓ or j/k. Hover is chrome; the selected row fills with accent.</p>
            </div>
          </Specimen>
          <Specimen label="KeyValue and Meter" code={`<KeyValue items={[["school", "UCF"]]} /> <Meter label="C / C++" value={90} />`}>
            <div className="grid w-full gap-6 sm:grid-cols-2">
              <KeyValue items={[["role", "PhD student"], ["school", "UCF"], ["focus", "hw security"]]} />
              <div className="space-y-1">
                <Meter label="C / C++" value={90} cells={14} />
                <Meter label="TypeScript" value={70} cells={14} />
              </div>
            </div>
          </Specimen>
          <Specimen label="Kbd">
            <span className="text-fg-subtle">press</span>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </Specimen>
        </div>
      </Pane>

      <Specimen label="Pane and PaneGrid" code={`<Pane title="projects" index={2} meta="10 total" footer="1 of 10" focused>…</Pane>`}>
        <PaneGrid cols={2} className="w-full pt-2">
          <Pane title="projects" index={2} meta="10 total" footer="1 of 10" focused>
            <p className="text-sm">Focused: accent border and title. index adds a [n] hotkey label.</p>
          </Pane>
          <Pane title="links" index={3} meta="sort: name">
            <p className="text-sm text-fg-muted">Unfocused panel.</p>
          </Pane>
          <Pane title="build failed" tone="danger">
            <p className="text-sm text-ansi-red">error: tone=&quot;danger&quot;</p>
          </Pane>
          <Pane>
            <p className="text-sm text-fg-muted">A bare box with no title.</p>
          </Pane>
        </PaneGrid>
      </Specimen>

      <Pane title="tabs.tsx">
        <Specimen label="Tabs" code={`<TabsTab value="a" index={1}>overview</TabsTab>`}>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTab value="overview" index={1}>
                overview
              </TabsTab>
              <TabsTab value="approach" index={2}>
                approach
              </TabsTab>
              <TabsTab value="results" index={3}>
                results
              </TabsTab>
              <TabsTab value="code" index={4} disabled>
                code
              </TabsTab>
            </TabsList>
            <TabsPanel value="overview">
              <p className="text-sm">The problem, in a paragraph.</p>
            </TabsPanel>
            <TabsPanel value="approach">
              <p className="text-sm">How it was solved.</p>
            </TabsPanel>
            <TabsPanel value="results">
              <p className="text-sm">What came out of it.</p>
            </TabsPanel>
          </Tabs>
        </Specimen>
      </Pane>

      <Pane title="overlays">
        <div className="space-y-5">
          <Specimen label="Dialog" code={`<DialogContent title="new message">…</DialogContent>`}>
            <Dialog>
              <DialogTrigger className={buttonVariants({ variant: "secondary", size: "sm" })}>open dialog</DialogTrigger>
              <DialogContent title="new message">
                <DialogDescription>
                  Dialogs are panes that float: accent border, the title set into the top edge and the close hint
                  into the bottom. Esc and clicking outside close them, and focus returns to the trigger.
                </DialogDescription>
                <DialogFooter>
                  <DialogClose className={buttonVariants({ variant: "ghost", size: "sm" })}>cancel</DialogClose>
                  <DialogClose className={buttonVariants({ variant: "primary", size: "sm" })}>send</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Specimen>
          <Specimen label="Tooltip" code={`<Tooltip><TooltipTrigger /><TooltipContent>…</TooltipContent></Tooltip>`}>
            <Tooltip>
              <TooltipTrigger className={buttonVariants({ variant: "secondary", size: "icon" })} aria-label="Visitor count">
                #
              </TooltipTrigger>
              <TooltipContent>visitors since 2024</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className={buttonVariants({ variant: "ghost", size: "sm" })}>hover me</TooltipTrigger>
              <TooltipContent side="bottom">
                opens below <Kbd className="ml-1">?</Kbd>
              </TooltipContent>
            </Tooltip>
          </Specimen>
          <Specimen label="Menu" code={`<Menu><MenuTrigger /><MenuContent><MenuRadioItem /></MenuContent></Menu>`}>
            <MenuDemo />
          </Specimen>
          <ShellSpecimen />
        </div>
      </Pane>
    </div>
  );
}

export function ComponentGallery({ themes }: { themes: readonly ThemeName[] }) {
  return (
    <div className="grid gap-pane-gap xl:grid-cols-2">
      {themes.map((theme) => (
        <ThemeScope key={theme} theme={theme} className="min-w-0 space-y-3 p-pane-gap">
          <p className="text-xs text-fg-subtle">
            <span className="text-accent">●</span> theme: {theme}
          </p>
          <Gallery />
        </ThemeScope>
      ))}
    </div>
  );
}
