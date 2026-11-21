import {
  BORDER,
  COLOR_TOKENS,
  DURATIONS,
  EASINGS,
  EFFECTS,
  FONT_FAMILY,
  LAYOUT,
  PALETTES,
  RADII,
  THEMES,
  TYPE_SCALE,
  type ThemeName,
} from "@/design-system/tokens";
import { contrastRatio, wcagLevel } from "@/design-system/contrast";
import { Pane, PaneGrid } from "@/components/ui/pane";
import { Badge } from "@/components/ui/badge";
import { ThemeScope } from "@/components/theme/theme-scope";
import { DesignSection, Specimen } from "./specimen";

const ROLE_LABELS = {
  surface: "surfaces",
  text: "text",
  line: "lines",
  accent: "accent",
  ansi: "ansi",
} as const;

function Swatch({ theme, name, usage }: { theme: ThemeName; name: (typeof COLOR_TOKENS)[number]["name"]; usage: string }) {
  const palette = PALETTES[theme];
  const hex = palette[name];
  const role = COLOR_TOKENS.find((t) => t.name === name)!.role;
  // Text-like tokens report contrast on the page background; accent-fg on accent.
  const against = name === "accent-fg" ? palette.accent : palette.canvas;
  const ratio = contrastRatio(hex, against);
  const showRatio = role !== "surface";
  return (
    <li className="flex min-w-0 items-start gap-3 border border-line bg-pane p-2">
      <span
        aria-hidden
        className="mt-0.5 size-9 shrink-0 border border-line"
        style={{ backgroundColor: hex }}
      />
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <code className="text-sm font-medium text-fg">{name}</code>
          <code className="text-xs text-fg-subtle">{hex}</code>
          {showRatio && (
            <Badge
              tone={ratio >= 4.5 ? "green" : ratio >= 3 ? "yellow" : "neutral"}
              title={`Contrast on ${name === "accent-fg" ? "accent" : "canvas"}`}
            >
              {ratio.toFixed(1)}:1 {wcagLevel(ratio)}
            </Badge>
          )}
        </div>
        <p className="text-xs text-fg-muted">{usage}</p>
      </div>
    </li>
  );
}

function Palette({ theme }: { theme: ThemeName }) {
  const roles = Object.keys(ROLE_LABELS) as (keyof typeof ROLE_LABELS)[];
  return (
    <ThemeScope theme={theme} className="min-w-0 p-pane-gap">
      <Pane title={`theme: ${theme}`} padding="sm">
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role} className="space-y-2">
              <p className="text-xs text-fg-subtle"># {ROLE_LABELS[role]}</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {COLOR_TOKENS.filter((t) => t.role === role).map((t) => (
                  <Swatch key={t.name} theme={theme} name={t.name} usage={t.usage} />
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-2">
            <p className="text-xs text-fg-subtle"># effects</p>
            <ul className="space-y-1 text-xs">
              {Object.entries(EFFECTS[theme]).map(([name, value]) => (
                <li key={name} className="flex flex-wrap gap-x-2">
                  <code className="text-fg">--{name}</code>
                  <code className="break-all text-fg-subtle">{value}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Pane>
    </ThemeScope>
  );
}

export function ColorSection() {
  return (
    <DesignSection
      id="color"
      title="Color"
      intro={
        <>
          <p>
            A dark terminal with a small ANSI palette. Use tokens as Tailwind colors (
            <code className="text-fg">bg-pane</code>, <code className="text-fg">text-fg-muted</code>,{" "}
            <code className="text-fg">border-accent/40</code>), never raw hex. Every text and ANSI color passes
            WCAG AA on canvas, pane and chrome, and a test fails the build if one stops passing.
          </p>
        </>
      }
    >
      <div className="grid gap-pane-gap xl:grid-cols-2">
        {THEMES.map((theme) => (
          <Palette key={theme} theme={theme} />
        ))}
      </div>
    </DesignSection>
  );
}

export function TypographySection() {
  return (
    <DesignSection
      id="type"
      title="Typography"
      intro={
        <p>
          JetBrains Mono is the only typeface, at weights {FONT_FAMILY.weights.join(", ")}. Ligatures are on
          everywhere through <code className="text-fg">font-feature-settings: {FONT_FAMILY.featureSettings}</code>.
        </p>
      }
    >
      <PaneGrid cols={2}>
        <Pane title="ligatures.ts" padding="md">
          <pre className="overflow-x-auto text-lg leading-relaxed">
            <code>
              <span className="text-ansi-magenta">const</span> ok = a <span className="text-accent">!==</span> b{" "}
              <span className="text-accent">&amp;&amp;</span> c <span className="text-accent">&gt;=</span> 0;{"\n"}
              <span className="text-ansi-magenta">const</span> f = (x) <span className="text-accent">=&gt;</span> x{" "}
              <span className="text-accent">??</span> []; <span className="text-fg-subtle">{"// -> <= :: |>"}</span>
            </code>
          </pre>
        </Pane>
        <Pane title="weights" padding="md">
          <ul className="space-y-1 text-lg">
            <li className="font-normal">400 regular: the quick brown fox</li>
            <li className="font-medium">500 medium: the quick brown fox</li>
            <li className="font-bold">700 bold: the quick brown fox</li>
            <li className="italic">400 italic: the quick brown fox</li>
          </ul>
        </Pane>
      </PaneGrid>
      <Pane title="type scale" padding="none">
        <ul className="divide-y divide-line">
          {TYPE_SCALE.map((step) => (
            <li key={step.name} className="grid gap-x-4 gap-y-1 px-pane-padding py-3 sm:grid-cols-[10rem_1fr]">
              <div className="space-y-0.5 text-xs">
                <code className="text-fg">text-{step.name}</code>
                <p className="text-fg-subtle">
                  {step.size} / {step.lineHeight}
                </p>
                <p className="text-fg-muted">{step.usage}</p>
              </div>
              <p
                className="truncate"
                style={{ fontSize: `var(--text-${step.name})`, lineHeight: `var(--leading-${step.name})` }}
              >Andres Delgado, computer architecture</p>
            </li>
          ))}
        </ul>
      </Pane>
    </DesignSection>
  );
}

export function LayoutSection() {
  const scale = [1, 2, 3, 4, 6, 8, 12, 16];
  return (
    <DesignSection
      id="layout"
      title="Spacing and layout"
      intro={
        <p>
          Spacing is Tailwind&apos;s 4px scale. The named layout tokens below define the terminal frame and are
          available as Tailwind spacing (<code className="text-fg">gap-pane-gap</code>,{" "}
          <code className="text-fg">h-statusbar</code>, <code className="text-fg">max-w-content</code>).
        </p>
      }
    >
      <PaneGrid cols={2}>
        <Pane title="layout tokens" padding="none">
          <ul className="divide-y divide-line text-xs">
            {Object.entries(LAYOUT).map(([name, { value, usage }]) => (
              <li key={name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-pane-padding py-2">
                <code className="text-fg">--{name}</code>
                <code className="text-accent">{value}</code>
                <span className="text-fg-muted">{usage}</span>
              </li>
            ))}
          </ul>
        </Pane>
        <Pane title="spacing scale" padding="md">
          <ul className="space-y-2 text-xs">
            {scale.map((n) => (
              <li key={n} className="flex items-center gap-3">
                <code className="w-10 shrink-0 text-fg-muted">{n}</code>
                <span aria-hidden className="h-3 bg-accent" style={{ width: `${n * 4}px` }} />
                <span className="text-fg-subtle">{n * 4}px</span>
              </li>
            ))}
          </ul>
        </Pane>
      </PaneGrid>
    </DesignSection>
  );
}

export function SurfaceSection() {
  return (
    <DesignSection
      id="surfaces"
      title="Borders, radii and shadows"
      intro={
        <p>
          Lines are {BORDER.width} and corners are square (radius {RADII.none}; {RADII.sm} only for tiny inline
          marks). The accent border means focus, as in i3. Panes stay flat; only floating layers get a shadow.
        </p>
      }
    >
      <div className="grid gap-pane-gap sm:grid-cols-2 lg:grid-cols-4">
        <Specimen label="border-line">
          <div className="h-16 w-full border border-line bg-pane" />
        </Specimen>
        <Specimen label="border-line-strong">
          <div className="h-16 w-full border border-line-strong bg-pane" />
        </Specimen>
        <Specimen label="border-accent (focused)">
          <div className="h-16 w-full border border-accent bg-pane" />
        </Specimen>
        <Specimen label="shadow-overlay">
          <div className="h-16 w-full border border-line-strong bg-overlay shadow-overlay" />
        </Specimen>
      </div>
      <Specimen label={`focus ring: ${BORDER.focusWidth} accent outline, ${BORDER.focusOffset} offset (Tab to it)`}>
        <a href="#surfaces" className="border border-line bg-pane px-3 py-2 text-sm">
          focusable link
        </a>
      </Specimen>
    </DesignSection>
  );
}

export function MotionSection() {
  return (
    <DesignSection
      id="motion"
      title="Motion"
      intro={
        <p>
          Short and functional. Use <code className="text-fg">duration-fast</code> and friends with{" "}
          <code className="text-fg">ease-out</code>. Everything collapses to instant under{" "}
          <code className="text-fg">prefers-reduced-motion</code>. Hover a row to play it.
        </p>
      }
    >
      <PaneGrid cols={2}>
        <Pane title="durations" padding="none">
          <ul className="divide-y divide-line text-xs">
            {Object.entries(DURATIONS).map(([name, { value, usage }]) => (
              <li key={name} className="group space-y-2 px-pane-padding py-2">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <code className="text-fg">duration-{name}</code>
                  <code className="text-accent">{value}</code>
                  <span className="text-fg-muted">{usage}</span>
                </div>
                <div className="h-1.5 bg-chrome">
                  <div
                    className="h-full w-4 bg-accent transition-[width] ease-out group-hover:w-full"
                    style={{ transitionDuration: value }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Pane>
        <Pane title="easings" padding="none">
          <ul className="divide-y divide-line text-xs">
            {Object.entries(EASINGS).map(([name, { value, usage }]) => (
              <li key={name} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-pane-padding py-2">
                <code className="text-fg">ease-{name}</code>
                <code className="text-fg-subtle">{value}</code>
                <span className="text-fg-muted">{usage}</span>
              </li>
            ))}
          </ul>
        </Pane>
      </PaneGrid>
    </DesignSection>
  );
}
