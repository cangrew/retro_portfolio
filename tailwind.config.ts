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
      },
      fontFamily: {
        // One typeface.
        mono:  FONT_FAMILY.stack,
        sans:  FONT_FAMILY.stack,
      },
      fontSize: {
        ...fontSize,
      },
      spacing: layoutSpacing,
      maxWidth: {
        content: "var(--content-max)",
        prose: "var(--prose-max)",
      },
      borderRadius: RADII,
      boxShadow: {
        overlay: "var(--shadow-overlay)",
      },
      transitionDuration: Object.fromEntries(
        Object.keys(DURATIONS).map((name) => [name, `var(--duration-${name})`]),
      ),
      transitionTimingFunction: Object.fromEntries(
        Object.keys(EASINGS).map((name) => [name, `var(--ease-${name})`]),
      ),
      animation: {
        blink: "blink 1s var(--ease-steps) infinite",
      },
      keyframes: {
        blink: {
          "0%, 49%":   { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [typography, designTokens],
} satisfies Config;
