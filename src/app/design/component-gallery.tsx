"use client";

import { useState } from "react";
import type { ThemeName } from "@/design-system/tokens";
import { ThemeScope } from "@/components/theme/theme-scope";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge, BADGE_TONES } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pane, PaneControls, PaneGrid } from "@/components/ui/pane";
import { Prompt, PromptHeading } from "@/components/ui/prompt";
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
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
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

function Gallery() {
  return (
    <div className="space-y-pane-gap">
      <Pane title="button.tsx" meta={<PaneControls />}>
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
              cd ~/projects
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

      <Pane title="prompt.tsx">
        <div className="space-y-5">
          <Specimen label="PromptHeading" code={`<PromptHeading level={1} path="~/projects" cursor>projects</PromptHeading>`}>
            <PromptHeading level={1} path="~/projects" cursor>
              projects
            </PromptHeading>
          </Specimen>
          <Specimen label="levels 2 to 4">
            <div className="space-y-2">
              <PromptHeading level={2} path="~/blog">
                writing
              </PromptHeading>
              <PromptHeading level={3} path="~/research">
                publications
              </PromptHeading>
              <PromptHeading level={4} path="~">
                about
              </PromptHeading>
            </div>
          </Specimen>
          <Specimen label="Prompt and Kbd">
            <Prompt path="~/src" /> <span>make test</span>
            <span className="text-fg-subtle">press</span>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </Specimen>
        </div>
      </Pane>

      <Specimen label="Pane and PaneGrid" code={`<PaneGrid cols={2}><Pane title="~/a" focused>…</Pane></PaneGrid>`}>
        <PaneGrid cols={2} className="w-full">
          <Pane title="~/projects — zsh" focused meta={<PaneControls />}>
            <p className="text-sm">Focused pane: accent border, like the active window in i3.</p>
          </Pane>
          <Pane title="htop" meta={<span>2/4</span>}>
            <p className="text-sm text-fg-muted">Unfocused pane.</p>
          </Pane>
          <Pane title="build failed" tone="danger">
            <p className="text-sm text-ansi-red">error: tone=&quot;danger&quot;</p>
          </Pane>
          <Pane>
            <p className="text-sm text-fg-muted">A bare pane with no title bar.</p>
          </Pane>
        </PaneGrid>
      </Specimen>

      <Specimen label="Card" code={`<Card interactive as="article">…</Card>`}>
        <div className="grid w-full gap-pane-gap sm:grid-cols-2">
          <Card interactive as="article">
            <CardHeader>
              <div className="flex gap-2">
                <Badge tone="magenta" variant="bracket">
                  RESEARCH
                </Badge>
                <span className="text-xs text-fg-subtle">2024</span>
              </div>
              <CardTitle>
                <a href="#components" className="text-fg no-underline after:absolute after:inset-0 hover:text-accent">
                  gem5_pmo
                </a>
              </CardTitle>
              <CardDescription>Persistent memory objects in gem5, for the LOaPP paper.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Badge>c++</Badge>
              <Badge>gem5</Badge>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Static card</CardTitle>
              <CardDescription>No hover state; for content that is not a link.</CardDescription>
            </CardHeader>
            <CardContent>Cards have no title bar. Use a Pane when the block is a &quot;window&quot;.</CardContent>
          </Card>
        </div>
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
          <Specimen label="Dialog" code={`<DialogContent title="~/contact — new message">…</DialogContent>`}>
            <Dialog>
              <DialogTrigger className={buttonVariants({ variant: "secondary", size: "sm" })}>open dialog</DialogTrigger>
              <DialogContent title="~/contact — new message">
                <DialogDescription>
                  Dialogs are panes that float: accent border, title bar, [x] to close. Esc and clicking outside also
                  close them, and focus returns to the trigger.
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
          <Specimen label="ThemeSwitcher (switches the page theme)">
            <ThemeSwitcher />
          </Specimen>
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
