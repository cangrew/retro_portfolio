import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography";
import {
  COLOR_TOKENS,
  DURATIONS,
  EASINGS,
  FONT_FAMILY,
  LAYOUT,
  RADII,
  THEMES,
  TYPE_SCALE,
  sharedVariables,
  themeSelector,
  themeVariables,
} from "./src/design-system/tokens";

/* Design-system colors: `bg-pane`, `text-fg-muted`, `border-accent/40`, … */
const tokenColors = Object.fromEntries(
  COLOR_TOKENS.map(({ name }) => [name, `rgb(var(--color-${name}) / <alpha-value>)`]),
);

const fontSize = Object.fromEntries(
  TYPE_SCALE.map((s) => [s.name, [`var(--text-${s.name})`, { lineHeight: `var(--leading-${s.name})` }]]),
) as Record<string, [string, { lineHeight: string }]>;

const layoutSpacing = Object.fromEntries(
  Object.keys(LAYOUT).map((name) => [name, `var(--${name})`]),
);

/** Emits the token custom properties into Tailwind's base layer. */
const designTokens = plugin(({ addBase }) => {
  addBase({ ":root": sharedVariables() });
  for (const theme of THEMES) {
    addBase({ [themeSelector(theme)]: themeVariables(theme) });
  }
});

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/design-system/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...tokenColors,
        // Legacy tokens. They now alias the design-system tokens (see
        // globals.css) so pages keep rendering until they are rebuilt.
        background: "var(--background)",
        foreground: "var(--foreground)",
        retro: {
          bg:           "var(--retro-bg)",
          "bg-tile":    "var(--retro-bg-tile)",
          panel:        "var(--retro-panel)",
          "panel-alt":  "var(--retro-panel-alt)",
          fg:           "var(--retro-fg)",
          "fg-dim":     "var(--retro-fg-dim)",
          green:        "var(--retro-green)",
          cyan:         "var(--retro-cyan)",
          magenta:      "var(--retro-magenta)",
          amber:        "var(--retro-amber)",
          "border-lt":  "var(--retro-border-lt)",
          "border-dk":  "var(--retro-border-dk)",
        },
      },
      fontFamily: {
        // One typeface. The legacy names point at it too.
        mono:  FONT_FAMILY.stack,
        sans:  FONT_FAMILY.stack,
        pixel: FONT_FAMILY.stack,
        vt:    FONT_FAMILY.stack,
      },
      fontSize: {
        ...fontSize,
        // Legacy sizes, rescaled for JetBrains Mono (the pixel fonts read larger).
        "pixel-xs": ["0.75rem",   { lineHeight: "1.125rem" }],
        "pixel-sm": ["0.8125rem", { lineHeight: "1.25rem" }],
        "pixel-md": ["0.9375rem", { lineHeight: "1.5rem" }],
        "pixel-lg": ["1.25rem",   { lineHeight: "1.75rem" }],
        "vt-md":    ["1rem",      { lineHeight: "1.5rem" }],
        "vt-lg":    ["1.25rem",   { lineHeight: "1.75rem" }],
        "vt-xl":    ["1.875rem",  { lineHeight: "2.25rem" }],
        "vt-2xl":   ["2.5rem",    { lineHeight: "2.875rem" }],
      },
      spacing: layoutSpacing,
      maxWidth: {
        content: "var(--content-max)",
        prose: "var(--prose-max)",
      },
      borderRadius: RADII,
      boxShadow: {
        overlay: "var(--shadow-overlay)",
        // Legacy glows are retired with the Win95 theme.
        "retro-raised":  "none",
        "retro-inset":   "none",
        "retro-green":   "none",
        "retro-cyan":    "none",
        "retro-magenta": "none",
        "retro-amber":   "none",
      },
      transitionDuration: Object.fromEntries(
        Object.keys(DURATIONS).map((name) => [name, `var(--duration-${name})`]),
      ),
      transitionTimingFunction: Object.fromEntries(
        Object.keys(EASINGS).map((name) => [name, `var(--ease-${name})`]),
      ),
      animation: {
        // Legacy animations — kept for pages not yet migrated
        "fade-in":        "fade-in 3s ease-in-out forwards",
        title:            "title 3s ease-out forwards",
        "fade-left":      "fade-left 3s ease-in-out forwards",
        "fade-left-stay": "fade-left-stay 3s ease-in-out forwards",
        "fade-right":     "fade-right 3s ease-in-out forwards",
        marquee:          "marquee 30s linear infinite",
        "marquee-slow":   "marquee 60s linear infinite",
        "marquee-fast":   "marquee 15s linear infinite",
        typewriter:       "typewriter 2s steps(40, end) forwards",
        "neon-pulse":     "neon-pulse 2s ease-in-out infinite",
        glitch:           "glitch 0.4s ease-in-out infinite",
        "scanline-flicker":"scanline-flicker 8s ease-in-out infinite",
        "new-badge":      "new-badge 0.8s step-end infinite",
        // Design system
        blink:            "blink 1s var(--ease-steps) infinite",
      },
      keyframes: {
        // Legacy keyframes
        "fade-in": {
          "0%":   { opacity: "0%" },
          "75%":  { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
        "fade-left": {
          "0%":   { transform: "translateX(100%)", opacity: "0%" },
          "30%":  { transform: "translateX(0%)",   opacity: "100%" },
          "100%": { opacity: "0%" },
        },
        "fade-left-stay": {
          "0%":   { transform: "translateX(100%)", opacity: "0%" },
          "30%":  { transform: "translateX(0%)",   opacity: "100%" },
          "100%": { opacity: "100%" },
        },
        "fade-right": {
          "0%":   { transform: "translateX(-100%)", opacity: "0%" },
          "30%":  { transform: "translateX(0%)",    opacity: "100%" },
          "100%": { opacity: "0%" },
        },
        title: {
          "0%":   { "line-height": "0%", "letter-spacing": "0.25em", opacity: "0" },
          "25%":  { "line-height": "0%", opacity: "0%" },
          "80%":  { opacity: "100%" },
          "100%": { "line-height": "100%", opacity: "100%" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        typewriter: {
          from: { width: "0" },
          to:   { width: "100%" },
        },
        "neon-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.85" },
        },
        glitch: {
          "0%":   { transform: "translate(0)" },
          "20%":  { transform: "translate(-2px, 2px)" },
          "40%":  { transform: "translate(-2px, -2px)" },
          "60%":  { transform: "translate(2px, 2px)" },
          "80%":  { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
        "scanline-flicker": {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.97" },
        },
        "new-badge": {
          "0%, 49%":   { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        // Design system
        blink: {
          "0%, 49%":   { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [typography, designTokens],
} satisfies Config;
