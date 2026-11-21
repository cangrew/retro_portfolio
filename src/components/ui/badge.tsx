import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const TONES = {
  neutral: { text: "text-fg-muted", border: "border-line-strong", solid: "bg-fg-muted text-canvas" },
  accent: { text: "text-accent", border: "border-accent", solid: "bg-accent text-accent-fg" },
  red: { text: "text-ansi-red", border: "border-ansi-red", solid: "bg-ansi-red text-canvas" },
  green: { text: "text-ansi-green", border: "border-ansi-green", solid: "bg-ansi-green text-canvas" },
  yellow: { text: "text-ansi-yellow", border: "border-ansi-yellow", solid: "bg-ansi-yellow text-canvas" },
  blue: { text: "text-ansi-blue", border: "border-ansi-blue", solid: "bg-ansi-blue text-canvas" },
  magenta: { text: "text-ansi-magenta", border: "border-ansi-magenta", solid: "bg-ansi-magenta text-canvas" },
  cyan: { text: "text-ansi-cyan", border: "border-ansi-cyan", solid: "bg-ansi-cyan text-canvas" },
} as const;

type Tone = keyof typeof TONES;

export const badgeVariants = cva(
  "inline-flex items-center gap-1 whitespace-nowrap rounded-none font-mono text-xs font-medium leading-none",
  {
    variants: {
      tone: Object.fromEntries(Object.keys(TONES).map((t) => [t, ""])) as Record<Tone, string>,
      variant: {
        /** Thin outline: tags and categories. */
        outline: "border bg-transparent px-1.5 py-1",
        /** Filled: status that must stand out. */
        solid: "border border-transparent px-1.5 py-1",
        /** No box, just brackets: [RESEARCH]. */
        bracket: "before:content-['['] after:content-[']']",
      },
    },
    compoundVariants: (Object.keys(TONES) as Tone[]).flatMap((tone) => [
      { tone, variant: "outline" as const, className: `${TONES[tone].text} ${TONES[tone].border}` },
      { tone, variant: "solid" as const, className: TONES[tone].solid },
      { tone, variant: "bracket" as const, className: TONES[tone].text },
    ]),
    defaultVariants: { tone: "neutral", variant: "outline" },
  },
);

export interface BadgeProps extends ComponentPropsWithoutRef<"span">, VariantProps<typeof badgeVariants> {}

export function Badge({ tone, variant, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone, variant }), className)} {...props} />;
}

export const BADGE_TONES = Object.keys(TONES) as Tone[];
