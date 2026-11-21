import { describe, it, expect } from "vitest";
import {
  COLOR_TOKENS,
  DEFAULT_THEME,
  PALETTES,
  THEMES,
  hexToChannels,
  sharedVariables,
  themeSelector,
  themeVariables,
} from "../tokens";
import { contrastRatio, wcagLevel } from "../contrast";

const TEXT_TOKENS = COLOR_TOKENS.filter((t) => t.role === "text" || t.role === "ansi").map((t) => t.name);
const SURFACES = ["canvas", "pane", "chrome", "overlay"] as const;

describe("palettes", () => {
  it.each(THEMES)("%s defines every color token as a hex value", (theme) => {
    for (const { name } of COLOR_TOKENS) {
      expect(PALETTES[theme][name], name).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  describe.each(THEMES)("%s contrast", (theme) => {
    const p = PALETTES[theme];

    it.each(TEXT_TOKENS)("%s passes AA (4.5:1) on every surface", (name) => {
      for (const surface of SURFACES) {
        expect(contrastRatio(p[name], p[surface]), `${name} on ${surface}`).toBeGreaterThanOrEqual(4.5);
      }
    });

    it("accent passes AA on every surface, so it works for links", () => {
      for (const surface of SURFACES) {
        expect(contrastRatio(p.accent, p[surface]), `accent on ${surface}`).toBeGreaterThanOrEqual(4.5);
      }
    });

    it("accent-fg passes AA on accent", () => {
      expect(contrastRatio(p["accent-fg"], p.accent)).toBeGreaterThanOrEqual(4.5);
    });

    it("line-strong reaches 3:1 for meaningful borders on canvas, pane and overlay", () => {
      for (const surface of ["canvas", "pane", "overlay"] as const) {
        expect(contrastRatio(p["line-strong"], p[surface]), surface).toBeGreaterThanOrEqual(3);
      }
    });
  });
});

describe("CSS generation", () => {
  it("converts hex to rgb channels", () => {
    expect(hexToChannels("#1793d1")).toBe("23 147 209");
    expect(hexToChannels("#fff")).toBe("255 255 255");
  });

  it.each(THEMES)("%s emits a variable for every color token plus color-scheme", (theme) => {
    const vars = themeVariables(theme);
    for (const { name } of COLOR_TOKENS) {
      expect(vars[`--color-${name}`]).toBe(hexToChannels(PALETTES[theme][name]));
    }
    expect(vars["color-scheme"]).toBe(theme);
    expect(vars["--shadow-overlay"]).toBeTruthy();
  });

  it("emits shared type, layout and motion variables", () => {
    const vars = sharedVariables();
    expect(vars["--text-base"]).toBeTruthy();
    expect(vars["--pane-gap"]).toBeTruthy();
    expect(vars["--duration-fast"]).toBe("100ms");
    expect(vars["--ease-out"]).toContain("cubic-bezier");
  });

  it("gives the default theme :root so the page is styled before hydration", () => {
    expect(themeSelector(DEFAULT_THEME)).toContain(":root");
    for (const theme of THEMES.filter((t) => t !== DEFAULT_THEME)) {
      expect(themeSelector(theme)).toBe(`[data-theme="${theme}"]`);
    }
  });
});

describe("contrast helpers", () => {
  it("computes known ratios", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
    expect(contrastRatio("#777777", "#777777")).toBeCloseTo(1, 5);
  });

  it("labels WCAG levels", () => {
    expect(wcagLevel(8)).toBe("AAA");
    expect(wcagLevel(5)).toBe("AA");
    expect(wcagLevel(3.2)).toBe("AA large");
    expect(wcagLevel(2)).toBe("fail");
  });
});
