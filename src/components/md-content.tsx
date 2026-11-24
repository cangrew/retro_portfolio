'use client';
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { PROSE } from "@/components/content/prose-styles";

const MarkdownComponents: Components = {
  h1: ({ children }) => <h2 className={PROSE.h1}>{children}</h2>,
  h2: ({ children }) => <h2 className={PROSE.h2}>{children}</h2>,
  h3: ({ children }) => <h3 className={PROSE.h3}>{children}</h3>,
  h4: ({ children }) => <h4 className={PROSE.h4}>{children}</h4>,
  p: ({ children }) => <p className={PROSE.p}>{children}</p>,
  a: ({ children, href }) => <a href={href} className={PROSE.a}>{children}</a>,
  code: ({ children, className }) => <code className={className ?? PROSE.code}>{children}</code>,
  pre: ({ children }) => <pre className={PROSE.pre}>{children}</pre>,
  blockquote: ({ children }) => <blockquote className={PROSE.blockquote}>{children}</blockquote>,
  ul: ({ children }) => <ul className={PROSE.ul}>{children}</ul>,
  ol: ({ children }) => <ol className={PROSE.ol}>{children}</ol>,
  li: ({ children }) => <li className={PROSE.li}>{children}</li>,
  strong: ({ children }) => <strong className={PROSE.strong}>{children}</strong>,
  hr: () => <hr className={PROSE.hr} />,
  table: ({ children }) => (
    <div className={PROSE.tableWrap}>
      <table className={PROSE.table}>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className={PROSE.thead}>{children}</thead>,
  tr: ({ children }) => <tr className={PROSE.tr}>{children}</tr>,
  th: ({ children }) => <th className={PROSE.th}>{children}</th>,
  td: ({ children }) => <td className={PROSE.td}>{children}</td>,
};

export default function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={MarkdownComponents}>
      {markdown}
    </ReactMarkdown>
  );
}
