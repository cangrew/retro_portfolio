import type { Metadata } from "next";
import { THEMES } from "@/design-system/tokens";
import { PageHeader } from "@/components/content/page-header";
import { Pane } from "@/components/ui/pane";
import MarkdownContent from "@/components/md-content";
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
  { id: "content", label: "post and project content" },
];

/** Every Markdown feature a post or project can use, rendered by the same component the pages use. */
const CONTENT_SAMPLE = `## A heading

Body text with **bold**, *emphasis*, \`inline code\`, ~~struck~~ text, a [link inside the site](/projects)
and an [outside link](https://www.gem5.org). Footnotes work too.[^1]

![Bar chart of L1 miss rate falling as cache size grows from 1K to 32K](/design/sample-figure.svg "An image on its own line becomes a figure; its title is the caption.")

### An embedded HTML artifact

<iframe src="/design/artifact-demo.html" title="Direct-mapped cache demo" height="260"></iframe>

| policy | L1 miss | L2 miss |
|--------|--------:|--------:|
| LRU    |   4.2%  |   1.1%  |
| FIFO   |   4.9%  |   1.3%  |

- [x] task lists
- [ ] still to do

> A quote, set off by a rule.

\`\`\`cpp
uint64_t set = (addr >> offset_bits) & (num_sets - 1);
\`\`\`

[^1]: Footnotes collect at the end of the post.
`;

const PRINCIPLES = [
  ["One typeface", "JetBrains Mono with ligatures, for headings, body and UI alike."],
  ["Panels, like a TUI", "One flat background, 1px boxes with the title set into the border, square corners. Borrow the components of terminal tools, never a copy of one."],
  ["No window chrome", "Nothing a terminal app wouldn't draw: no title bars, no [x] corners, no bevels, glows, marquees or cards. Popups close with esc, shown as a hint in the border."],
  ["Accent means focus", "Arch blue marks the focused panel, the selected row, the active tab, the primary action and links."],
  ["Rows, not cards", "Content sits in lists and tables with a header row; the selected row fills with accent. Sections inside a pane are rules with the title set in."],
  ["Keyboard first", "Number keys jump between pages, : or ⌘K opens the command palette, and every control shows a focus ring. Key hints run along the bottom."],
  ["Readable before clever", "Every text color passes WCAG AA; motion is short and respects reduced motion."],
] as const;

export default function DesignPage() {
  return (
    <main className="space-y-16">
      <header className="space-y-4">
        <PageHeader title="Design system" />
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

      <DesignSection
        id="content"
        title="Post and project content"
        intro={
          <p>
            Markdown in <code className="text-fg">content/blog</code> and <code className="text-fg">content/projects</code>,
            rendered by <code className="text-fg">md-content.tsx</code>. Raw HTML is allowed, so a post can embed an
            iframe, a video or an HTML artifact kept in <code className="text-fg">public/</code>.
          </p>
        }
      >
        <Pane title="sample.mdx">
          <article className="max-w-prose">
            <MarkdownContent markdown={CONTENT_SAMPLE} />
          </article>
        </Pane>
      </DesignSection>
    </main>
  );
}
