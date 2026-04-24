import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => (
      <h1 {...props} className="font-pixel text-pixel-md text-retro-green mt-6 mb-3 leading-relaxed" />
    ),
    h2: (props) => (
      <h2 {...props} className="font-pixel text-pixel-sm text-retro-cyan mt-5 mb-2 leading-relaxed" />
    ),
    h3: (props) => (
      <h3 {...props} className="font-pixel text-pixel-xs text-retro-magenta mt-4 mb-2 leading-relaxed" />
    ),
    p: (props) => (
      <p {...props} className="font-mono text-sm text-retro-fg leading-relaxed mb-3" />
    ),
    a: (props) => (
      <a {...props} className="text-retro-cyan hover:text-retro-green underline" />
    ),
    code: (props) => (
      <code {...props} className="font-mono text-retro-amber bg-retro-bg px-1 text-xs" />
    ),
    pre: (props) => (
      <pre {...props} className="font-mono text-xs bg-retro-bg retro-inset p-4 overflow-x-auto my-3" />
    ),
    blockquote: (props) => (
      <blockquote
        {...props}
        className="border-l-4 border-retro-green pl-4 text-retro-fg-dim font-mono text-sm italic my-3"
      />
    ),
    ul: (props) => (
      <ul {...props} className="font-mono text-sm text-retro-fg space-y-1 mb-3 pl-4 list-none" />
    ),
    ol: (props) => (
      <ol {...props} className="font-mono text-sm text-retro-fg space-y-1 mb-3 pl-4 list-decimal" />
    ),
    li: (props) => (
      <li {...props} className="before:content-['▶'] before:text-retro-green before:mr-2" />
    ),
    strong: (props) => (
      <strong {...props} className="text-retro-fg font-bold" />
    ),
    hr: () => (
      <hr
        className="border-none h-px my-4"
        style={{
          background:
            "repeating-linear-gradient(90deg,#39ff14 0,#39ff14 8px,#00ffff 8px,#00ffff 16px)",
        }}
      />
    ),
  };
}
