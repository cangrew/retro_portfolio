/**
 * Class names for rendered Markdown, shared by react-markdown (md-content.tsx)
 * and @next/mdx (mdx-components.tsx). Styled like a terminal Markdown pager:
 * heading markers stay visible, lists use plain dashes.
 *
 * No "use client" here: server modules import these strings.
 */
export const PROSE = {
  h1: "mt-8 mb-3 text-xl font-bold text-accent before:text-fg-subtle before:content-['#_']",
  h2: "mt-8 mb-3 text-lg font-bold text-fg before:text-fg-subtle before:content-['##_']",
  h3: "mt-6 mb-2 text-base font-bold text-fg before:text-fg-subtle before:content-['###_']",
  h4: "mt-5 mb-2 text-base font-medium text-fg-muted before:text-fg-subtle before:content-['####_']",
  p: "my-3 leading-relaxed text-fg",
  a: "text-accent underline underline-offset-2 hover:text-ansi-cyan",
  code: "bg-chrome px-1 text-[0.9em] text-ansi-yellow",
  pre: "my-4 overflow-x-auto border border-line bg-pane p-3 text-sm [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-fg",
  blockquote: "my-4 border-l-2 border-line-strong pl-4 text-fg-muted",
  ul: "my-3 list-['-_'] space-y-1 pl-5 marker:text-fg-subtle",
  ol: "my-3 list-decimal space-y-1 pl-6 marker:text-fg-subtle",
  li: "pl-1",
  strong: "font-bold text-fg",
  hr: "my-6 border-line",
  tableWrap: "my-4 overflow-x-auto",
  table: "w-full border-collapse text-sm",
  thead: "bg-chrome",
  tr: "border-b border-line",
  th: "px-2 py-1 text-left text-xs font-bold text-fg-muted",
  td: "px-2 py-1.5 align-top",
} as const;
