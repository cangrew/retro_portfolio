'use client';
import React from "react";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const MarkdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="font-pixel text-pixel-md text-retro-green mt-6 mb-3 leading-relaxed">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="font-pixel text-pixel-sm text-retro-cyan mt-5 mb-2 leading-relaxed">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-pixel text-pixel-xs text-retro-magenta mt-4 mb-2 leading-relaxed">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="font-mono text-sm text-retro-fg leading-relaxed mb-3">{children}</p>
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-retro-cyan hover:text-retro-green underline">{children}</a>
  ),
  code: ({ children }) => (
    <code className="font-mono text-retro-amber bg-retro-bg px-1 text-xs">{children}</code>
  ),
  pre: ({ children }) => (
    <pre className="font-mono text-xs bg-retro-bg retro-inset p-4 overflow-x-auto my-3">{children}</pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-retro-green pl-4 text-retro-fg-dim font-mono text-sm italic my-3">
      {children}
    </blockquote>
  ),
  ul: ({ children }) => (
    <ul className="font-mono text-sm text-retro-fg space-y-1 mb-3 pl-4 list-none">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="font-mono text-sm text-retro-fg space-y-1 mb-3 pl-4 list-decimal">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="before:content-['▶'] before:text-retro-green before:mr-2">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="text-retro-fg font-bold">{children}</strong>
  ),
  hr: () => (
    <hr
      className="border-none h-px my-4"
      style={{
        background: "repeating-linear-gradient(90deg,#39ff14 0,#39ff14 8px,#00ffff 8px,#00ffff 16px)",
      }}
    />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full font-mono text-xs border-collapse retro-inset">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-retro-bg border-b border-retro-green">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-retro-green/30 even:bg-retro-green/5">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="text-retro-green text-left px-2 py-2 font-pixel text-[9px] leading-tight">{children}</th>
  ),
  td: ({ children }) => (
    <td className="text-retro-fg px-2 py-1.5 text-[11px] leading-snug">{children}</td>
  ),
};

export default function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={MarkdownComponents}
    >
      {markdown}
    </ReactMarkdown>
  );
}
