/**
 * Class names for rendered Markdown, shared by react-markdown (md-content.tsx)
 * and @next/mdx (mdx-components.tsx). Styled like a terminal Markdown pager:
 * heading markers stay visible, lists use plain dashes.
 *
 * No "use client" here: server modules import these strings.
 */
/* Body text (p, li, blockquote) is justified, with hyphenation so lines don't open wide gaps. */
export const PROSE = {
  /** Wraps the whole rendered document; long words and URLs wrap instead of overflowing. */
  root: "min-w-0 break-words [&>:first-child]:mt-0",
  h1: "mt-8 mb-3 text-xl font-bold text-accent before:text-fg-subtle before:content-['#_']",
  h2: "mt-8 mb-3 text-lg font-bold text-fg before:text-fg-subtle before:content-['##_']",
  h3: "mt-6 mb-2 text-base font-bold text-fg before:text-fg-subtle before:content-['###_']",
  h4: "mt-5 mb-2 text-base font-medium text-fg-muted before:text-fg-subtle before:content-['####_']",
  p: "my-3 text-justify hyphens-auto leading-relaxed text-fg",
  a: "text-accent underline underline-offset-2 hover:text-ansi-cyan",
  code: "bg-chrome px-1 text-[0.9em] text-ansi-yellow",
  preWrap: "relative my-4",
  preLang: "absolute right-0 top-0 bg-chrome px-1.5 py-0.5 text-xs text-fg-subtle",
  pre: "overflow-x-auto border border-line bg-pane p-3 text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-fg",
  blockquote: "my-4 border-l-2 border-line-strong pl-4 text-justify hyphens-auto text-fg-muted",
  ul: "my-3 list-['-_'] space-y-1 pl-5 marker:text-fg-subtle",
  ol: "my-3 list-decimal space-y-1 pl-6 marker:text-fg-subtle",
  li: "pl-1 text-justify hyphens-auto",
  taskList: "my-3 space-y-1 [&_input]:mr-2 [&_input]:accent-accent",
  strong: "font-bold text-fg",
  em: "italic text-fg",
  del: "text-fg-subtle line-through",
  sup: "text-[0.75em] [&_a]:no-underline",
  hr: "my-6 border-line",
  tableWrap: "my-4 overflow-x-auto",
  table: "w-full border-collapse text-sm",
  thead: "bg-chrome",
  tr: "border-b border-line",
  th: "px-2 py-1 text-left text-xs font-bold text-fg-muted",
  td: "px-2 py-1.5 align-top",
  /** An image or iframe on its own line, with an optional caption below. */
  figure: "my-6 space-y-2",
  figcaption: "text-sm text-fg-subtle before:content-['↳_']",
  img: "h-auto max-w-full border border-line bg-pane",
  /** An embedded HTML artifact or page: a 16:9 frame unless the iframe sets a height. */
  embed: "my-6 space-y-2",
  iframe: "block aspect-video w-full border border-line bg-pane",
  iframeFixed: "block w-full border border-line bg-pane",
  footnotes: "mt-10 border-t border-line pt-4 text-sm text-fg-muted [&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6",
} as const;
