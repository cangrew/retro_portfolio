import type { Metadata } from "next";
import { THEMES } from "@/design-system/tokens";
import { PromptHeading } from "@/components/ui/prompt";
import { Pane } from "@/components/ui/pane";
import { ComponentGallery } from "./component-gallery";
import { DesignSection } from "./specimen";
import {
  ColorSection,
  LayoutSection,
  MotionSection,
  SurfaceSection,
  TypographySection,
} from "./token-sections";

export const metadata: Metadata = {
  title: "Design system",
  description: "Tokens and components behind andresddelgado.com.",
  robots: { index: false, follow: false },
};

const CONTENTS = [
  { id: "principles", label: "principles" },
  { id: "color", label: "color" },
  { id: "type", label: "typography" },
  { id: "layout", label: "spacing and layout" },
  { id: "surfaces", label: "borders, radii, shadows" },
  { id: "motion", label: "motion" },
  { id: "components", label: "components" },
];

const PRINCIPLES = [
  ["One typeface", "JetBrains Mono with ligatures, for headings, body and UI alike."],
  ["Tiles, not cards floating in space", "Panes with 1px lines and square corners, tiled with small gaps."],
  ["Accent means focus", "Arch blue marks the focused pane, the active tab, the primary action and links."],
  ["Prompts as headings", "Section titles read like commands typed at a shell."],
  ["Keyboard first", "Every control is reachable by Tab and shows a 2px accent focus ring."],
  ["Readable before clever", "Every text color passes WCAG AA; motion is short and respects reduced motion."],
] as const;

export default function DesignPage() {
  return (
    <main className="mx-auto max-w-[96rem] space-y-16 px-4 pb-16 pt-20 sm:px-6">
      <header className="space-y-4">
        <PromptHeading level={1} path="~/design" cursor>
          design system
        </PromptHeading>
        <p className="max-w-prose text-fg-muted">
          The tokens and components every page is built from. Values live in{" "}
          <code className="text-fg">src/design-system/tokens.ts</code>, components in{" "}
          <code className="text-fg">src/components/ui</code>. Check new work against this page.
        </p>
        <nav aria-label="Sections">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {CONTENTS.map((c, i) => (
              <li key={c.id}>
                <a href={`#${c.id}`} className="no-underline hover:underline">
                  <span className="text-fg-subtle">{i + 1}:</span>
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <DesignSection id="principles" title="Principles">
        <Pane title="README.md" padding="none">
          <dl className="divide-y divide-line">
            {PRINCIPLES.map(([term, desc]) => (
              <div key={term} className="grid gap-x-6 gap-y-1 px-pane-padding py-3 sm:grid-cols-[18rem_1fr]">
                <dt className="font-medium text-fg">{term}</dt>
                <dd className="text-sm text-fg-muted">{desc}</dd>
              </div>
            ))}
          </dl>
        </Pane>
      </DesignSection>

      <ColorSection />
      <TypographySection />
      <LayoutSection />
      <SurfaceSection />
      <MotionSection />

      <DesignSection
        id="components"
        title="Components"
        intro={
          <p>
            Built on Base UI primitives (behavior and accessibility) and styled with cva variants. Each theme is shown
            side by side; popups opened in a column use that column&apos;s theme.
          </p>
        }
      >
        <ComponentGallery themes={THEMES} />
      </DesignSection>
    </main>
  );
}
