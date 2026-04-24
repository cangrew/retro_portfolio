import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy shadcn/ui tokens — kept so existing components don't break during migration
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Retro design system
        retro: {
          bg:           "#0a0e27",
          "bg-tile":    "#10163a",
          panel:        "#1a1f4a",
          "panel-alt":  "#232a5c",
          fg:           "#e6e6fa",
          "fg-dim":     "#9090c0",
          green:        "#39ff14",
          cyan:         "#00ffff",
          magenta:      "#ff00ff",
          amber:        "#ffb000",
          "border-lt":  "#d4d4f0",
          "border-dk":  "#0a0a20",
        },
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", '"Press Start 2P"', "monospace"],
        vt:    ["var(--font-vt)",    "VT323",            "monospace"],
        mono:  ["var(--font-mono)",  '"IBM Plex Mono"',  "Courier", "monospace"],
      },
      fontSize: {
        "pixel-xs": ["10px", { lineHeight: "16px" }],
        "pixel-sm": ["12px", { lineHeight: "20px" }],
        "pixel-md": ["16px", { lineHeight: "24px" }],
        "pixel-lg": ["24px", { lineHeight: "32px" }],
        "vt-md":    ["20px", { lineHeight: "24px" }],
        "vt-lg":    ["28px", { lineHeight: "32px" }],
        "vt-xl":    ["40px", { lineHeight: "44px" }],
        "vt-2xl":   ["56px", { lineHeight: "60px" }],
      },
      boxShadow: {
        "retro-raised":  "2px 2px 0 #0a0a20, -1px -1px 0 #d4d4f0, inset 1px 1px 0 rgba(255,255,255,0.15)",
        "retro-inset":   "-2px -2px 0 #0a0a20, 1px 1px 0 #d4d4f0, inset -1px -1px 0 rgba(255,255,255,0.1)",
        "retro-green":   "0 0 8px #39ff14, 0 0 16px rgba(57,255,20,0.5), inset 0 0 4px rgba(57,255,20,0.2)",
        "retro-cyan":    "0 0 8px #00ffff, 0 0 16px rgba(0,255,255,0.5)",
        "retro-magenta": "0 0 8px #ff00ff, 0 0 16px rgba(255,0,255,0.5)",
        "retro-amber":   "0 0 8px #ffb000, 0 0 16px rgba(255,176,0,0.5)",
      },
      animation: {
        // Legacy animations — kept for pages not yet migrated
        "fade-in":        "fade-in 3s ease-in-out forwards",
        title:            "title 3s ease-out forwards",
        "fade-left":      "fade-left 3s ease-in-out forwards",
        "fade-left-stay": "fade-left-stay 3s ease-in-out forwards",
        "fade-right":     "fade-right 3s ease-in-out forwards",
        // Retro animations
        blink:            "blink 1s step-end infinite",
        marquee:          "marquee 30s linear infinite",
        "marquee-slow":   "marquee 60s linear infinite",
        "marquee-fast":   "marquee 15s linear infinite",
        typewriter:       "typewriter 2s steps(40, end) forwards",
        "neon-pulse":     "neon-pulse 2s ease-in-out infinite",
        glitch:           "glitch 0.4s ease-in-out infinite",
        "scanline-flicker":"scanline-flicker 8s ease-in-out infinite",
        "new-badge":      "new-badge 0.8s step-end infinite",
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
        // Retro keyframes
        blink: {
          "0%, 49%":   { opacity: "1" },
          "50%, 100%": { opacity: "0" },
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
          "0%, 100%": { textShadow: "0 0 7px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14" },
          "50%":      { textShadow: "0 0 2px #39ff14, 0 0 4px #39ff14" },
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
      },
    },
  },
  plugins: [typography],
} satisfies Config;
