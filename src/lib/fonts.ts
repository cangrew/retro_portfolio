import { JetBrains_Mono } from "next/font/google";

/**
 * JetBrains Mono is the site's only typeface. Its ligatures live in the
 * `calt` feature, which globals.css turns on for the whole page.
 *
 * next/font needs literal options, so the variable name is repeated here;
 * it must match FONT_FAMILY.variable in src/design-system/tokens.ts.
 */
export const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
