/**
 * Design tokens: the single source of truth for the site's look.
 *
 * Everything visual starts here. `tailwind.config.ts` turns these values into
 * CSS custom properties (one set per theme) and Tailwind utilities, and the
 * /design page renders them, so changing a value here changes it everywhere.
 *
 * Keep this file free of path aliases and React imports: the Tailwind config
 * loads it directly.
 */

/* ── Themes ─────────────────────────────────────────────────────────────── */

export const THEMES = ["dark", "light"] as const;
export type ThemeName = (typeof THEMES)[number];
export const DEFAULT_THEME: ThemeName = "dark";
/** localStorage key next-themes uses to remember the visitor's choice. */
export const THEME_STORAGE_KEY = "theme";

/* ── Color ──────────────────────────────────────────────────────────────── */

export type ColorRole = "surface" | "text" | "line" | "accent" | "ansi";

export interface ColorTokenMeta {
  /** Token name. Becomes `--color-<name>` and the Tailwind color `<name>`. */
  name: string;
  role: ColorRole;
  usage: string;
}

/** Order here is the order the /design page shows them in. */
export const COLOR_TOKENS = [
  { name: "canvas", role: "surface", usage: "Page background, the gap between tiled panes" },
  { name: "pane", role: "surface", usage: "Pane and card bodies" },
  { name: "chrome", role: "surface", usage: "Pane title bars, status bar, hovered rows" },
  { name: "overlay", role: "surface", usage: "Dialogs, menus, tooltips" },
  { name: "fg", role: "text", usage: "Body text" },
  { name: "fg-muted", role: "text", usage: "Secondary text, descriptions, inactive tabs" },
  { name: "fg-subtle", role: "text", usage: "Metadata, placeholders, prompt punctuation" },
  { name: "line", role: "line", usage: "Default 1px borders and dividers" },
  { name: "line-strong", role: "line", usage: "Hovered borders, emphasized dividers" },
  { name: "accent", role: "accent", usage: "Focused pane, active tab, primary action, links" },
  { name: "accent-fg", role: "accent", usage: "Text on an accent fill" },
  { name: "ansi-red", role: "ansi", usage: "Errors, destructive actions" },
  { name: "ansi-green", role: "ansi", usage: "Prompt user@host, success" },
  { name: "ansi-yellow", role: "ansi", usage: "Warnings, highlights" },
  { name: "ansi-blue", role: "ansi", usage: "Prompt path, directories" },
  { name: "ansi-magenta", role: "ansi", usage: "Research, keywords" },
  { name: "ansi-cyan", role: "ansi", usage: "Links on hover, info" },
] as const satisfies readonly ColorTokenMeta[];

export type ColorTokenName = (typeof COLOR_TOKENS)[number]["name"];
export type ColorPalette = Record<ColorTokenName, string>;

/**
 * Palettes. Dark grows out of the old Arch theme (Arch blue accent, Catppuccin
 * text); light is the same terminal on paper. Every text and ANSI color clears
 * WCAG AA (4.5:1) on canvas, pane and chrome — `tokens.test.ts` enforces it.
 */
export const PALETTES: Record<ThemeName, ColorPalette> = {
  dark: {
    canvas: "#0c0c0c",
    pane: "#121212",
    chrome: "#1b1b1d",
    overlay: "#18181b",
    fg: "#cdd6f4",
    "fg-muted": "#a6adc8",
    "fg-subtle": "#8a8fa8",
    line: "#313244",
    "line-strong": "#62657d",
    accent: "#1793d1",
    "accent-fg": "#0c0c0c",
    "ansi-red": "#f38ba8",
    "ansi-green": "#a6e3a1",
    "ansi-yellow": "#f9e2af",
    "ansi-blue": "#89b4fa",
    "ansi-magenta": "#cba6f7",
    "ansi-cyan": "#89dceb",
  },
  light: {
    canvas: "#ecebe6",
    pane: "#fafaf7",
    chrome: "#e2e1da",
    overlay: "#ffffff",
    fg: "#1e1e2e",
    "fg-muted": "#45475a",
    "fg-subtle": "#5f6177",
    line: "#c9c8bf",
    "line-strong": "#86857c",
    accent: "#0a628f",
    "accent-fg": "#ffffff",
    "ansi-red": "#b0122c",
    "ansi-green": "#24661a",
    "ansi-yellow": "#7a4f00",
    "ansi-blue": "#1a4fb5",
    "ansi-magenta": "#7130bd",
    "ansi-cyan": "#0a6170",
  },
};

/* ── Per-theme effects ──────────────────────────────────────────────────── */

export interface ThemeEffects {
  /** Drop shadow for floating layers (dialogs, menus). Panes stay flat. */
  "shadow-overlay": string;
  /** Backdrop behind modal dialogs. */
  "backdrop": string;
  /** Text selection background. */
  "selection": string;
}

export const EFFECTS: Record<ThemeName, ThemeEffects> = {
  dark: {
    "shadow-overlay": "0 12px 32px rgb(0 0 0 / 0.55)",
    backdrop: "rgb(0 0 0 / 0.6)",
    selection: "rgb(23 147 209 / 0.35)",
  },
  light: {
    "shadow-overlay": "0 12px 32px rgb(30 30 46 / 0.16)",
    backdrop: "rgb(30 30 46 / 0.35)",
    selection: "rgb(10 98 143 / 0.22)",
  },
};

/* ── Typography ─────────────────────────────────────────────────────────── */

/** One typeface for everything. Loaded by next/font in src/lib/fonts.ts. */
export const FONT_FAMILY = {
  variable: "--font-jetbrains-mono",
  stack: ["var(--font-jetbrains-mono)", '"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  /** Ligatures (`=>`, `!=`, `===`) live in JetBrains Mono's `calt` feature. */
  featureSettings: '"calt" 1, "liga" 1',
  weights: [400, 500, 700] as const,
};

export interface TypeStep {
  name: string;
  size: string;
  lineHeight: string;
  usage: string;
}

/** A tight scale tuned for a monospace face: mono reads larger than proportional type. */
export const TYPE_SCALE = [
  { name: "2xs", size: "0.6875rem", lineHeight: "1rem", usage: "Status bar, keyboard hints" },
  { name: "xs", size: "0.75rem", lineHeight: "1.125rem", usage: "Badges, metadata, pane titles" },
  { name: "sm", size: "0.8125rem", lineHeight: "1.25rem", usage: "UI controls, captions" },
  { name: "base", size: "0.9375rem", lineHeight: "1.6rem", usage: "Body text" },
  { name: "lg", size: "1.0625rem", lineHeight: "1.65rem", usage: "Lead paragraphs, h4" },
  { name: "xl", size: "1.25rem", lineHeight: "1.75rem", usage: "h3" },
  { name: "2xl", size: "1.5rem", lineHeight: "2rem", usage: "h2" },
  { name: "3xl", size: "1.875rem", lineHeight: "2.25rem", usage: "h1" },
  { name: "4xl", size: "2.5rem", lineHeight: "2.875rem", usage: "Hero name" },
] as const satisfies readonly TypeStep[];

/* ── Spacing and layout ─────────────────────────────────────────────────── */

/**
 * Spacing uses Tailwind's 4px scale (p-1 = 4px, p-2 = 8px, …). These named
 * layout tokens sit on top of it for the terminal frame.
 */
export const LAYOUT = {
  "pane-gap": { value: "0.875rem", usage: "Gap between panes; leaves room for titles set in the border" },
  "pane-padding": { value: "1rem", usage: "Padding inside a pane body" },
  "pane-header": { value: "1.75rem", usage: "Height of the mobile top bar" },
  "statusbar": { value: "1.5rem", usage: "Height of the bottom status bar" },
  "content-max": { value: "72rem", usage: "Max width of page content" },
  "prose-max": { value: "72ch", usage: "Max width of long-form text" },
} as const;

/* ── Borders and radii ──────────────────────────────────────────────────── */

export const BORDER = {
  width: "1px",
  /** Focus ring: a 2px accent outline, offset so it never covers content. */
  focusWidth: "2px",
  focusOffset: "2px",
} as const;

/** Terminals have square corners. `sm` exists only for tiny inline marks. */
export const RADII = {
  none: "0px",
  sm: "2px",
} as const;

/* ── Motion ─────────────────────────────────────────────────────────────── */

export const DURATIONS = {
  instant: { value: "0ms", usage: "Tab and theme switches" },
  fast: { value: "100ms", usage: "Hover and press feedback, tooltips" },
  base: { value: "160ms", usage: "Menus and dialogs opening" },
  slow: { value: "240ms", usage: "Page transitions" },
} as const;

export const EASINGS = {
  out: { value: "cubic-bezier(0.2, 0.8, 0.2, 1)", usage: "Things entering" },
  in: { value: "cubic-bezier(0.4, 0, 1, 1)", usage: "Things leaving" },
  steps: { value: "steps(1, end)", usage: "Cursor blink, hard terminal cuts" },
} as const;

/* ── CSS generation ─────────────────────────────────────────────────────── */

/** "#1793d1" → "23 147 209", so Tailwind can apply opacity (`bg-accent/20`). */
export function hexToChannels(hex: string): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** The custom properties for one theme, as a plain object. */
export function themeVariables(theme: ThemeName): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const { name } of COLOR_TOKENS) {
    vars[`--color-${name}`] = hexToChannels(PALETTES[theme][name]);
  }
  for (const [name, value] of Object.entries(EFFECTS[theme])) {
    vars[`--${name}`] = value;
  }
  vars["color-scheme"] = theme;
  return vars;
}

/** Custom properties that are the same in every theme. */
export function sharedVariables(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const step of TYPE_SCALE) {
    vars[`--text-${step.name}`] = step.size;
    vars[`--leading-${step.name}`] = step.lineHeight;
  }
  for (const [name, { value }] of Object.entries(LAYOUT)) vars[`--${name}`] = value;
  for (const [name, { value }] of Object.entries(DURATIONS)) vars[`--duration-${name}`] = value;
  for (const [name, { value }] of Object.entries(EASINGS)) vars[`--ease-${name}`] = value;
  return vars;
}

/**
 * Selector for each theme. The default theme also owns `:root`, so the site
 * renders correctly before next-themes sets `data-theme`. Any element can
 * carry `data-theme` to scope a theme to a subtree (the /design page does).
 */
export function themeSelector(theme: ThemeName): string {
  return theme === DEFAULT_THEME ? `:root, [data-theme="${theme}"]` : `[data-theme="${theme}"]`;
}
