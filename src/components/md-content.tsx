import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import { PROSE } from "@/components/content/prose-styles";
import { rehypeFigures } from "@/util/rehype-figures";

/*
 * Renders project and post Markdown on the server, so pages ship HTML and no
 * Markdown parser.
 *
 * Content is written by the site owner, so raw HTML is allowed (rehype-raw):
 * that is how posts embed iframes, <video> and HTML artifacts. /design#content
 * shows every feature; CLAUDE.md lists the syntax.
 */

const EXTERNAL = /^https?:\/\//;

/** The language of a fenced code block, from react-markdown's `language-xxx` class. */
function languageOf(children: ReactNode): string | undefined {
  const child = Array.isArray(children) ? children[0] : children;
  const className: unknown = (child as { props?: { className?: unknown } } | null)?.props?.className;
  if (typeof className !== "string") return undefined;
  return /language-([\w+-]+)/.exec(className)?.[1];
}

function Heading({ as: Tag, id, className, children }: { as: "h2" | "h3" | "h4"; id?: string; className: string; children: ReactNode }) {
  return (
    <Tag id={id} className={`group/heading scroll-mt-28 ${className}`}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          className="ml-2 text-fg-subtle no-underline opacity-0 transition-opacity duration-fast hover:text-accent focus-visible:opacity-100 group-hover/heading:opacity-100"
        >
          <span aria-hidden>#</span>
          <span className="sr-only">Link to this section</span>
        </a>
      )}
    </Tag>
  );
}

const components: Components = {
  // A post's title is the page h1, so Markdown headings start at h2.
  h1: ({ id, children }) => <Heading as="h2" id={id} className={PROSE.h1}>{children}</Heading>,
  h2: ({ id, children }) => <Heading as="h2" id={id} className={PROSE.h2}>{children}</Heading>,
  h3: ({ id, children }) => <Heading as="h3" id={id} className={PROSE.h3}>{children}</Heading>,
  h4: ({ id, children }) => <Heading as="h4" id={id} className={PROSE.h4}>{children}</Heading>,
  p: ({ children }) => <p className={PROSE.p}>{children}</p>,
  a: ({ children, href = "", id, target, rel, ...props }) => {
    const external = EXTERNAL.test(href);
    return (
      <a
        id={id}
        href={href}
        target={target ?? (external ? "_blank" : undefined)}
        rel={rel ?? (external ? "noopener noreferrer" : undefined)}
        aria-describedby={props["aria-describedby"]}
        data-footnote-ref={"data-footnote-ref" in props ? true : undefined}
        data-footnote-backref={"data-footnote-backref" in props ? true : undefined}
        className={PROSE.a}
      >
        {children}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  },
  code: ({ children, className }) => <code className={className ?? PROSE.code}>{children}</code>,
  pre: ({ children }) => {
    const lang = languageOf(children);
    return (
      <div className={PROSE.preWrap}>
        {lang && (
          <span aria-hidden className={PROSE.preLang}>
            {lang}
          </span>
        )}
        {/* Focusable so keyboard users can scroll long lines (WCAG 2.1.1). */}
        <pre tabIndex={0} className={PROSE.pre} aria-label={lang ? `${lang} code` : "code"}>
          {children}
        </pre>
      </div>
    );
  },
  blockquote: ({ children }) => <blockquote className={PROSE.blockquote}>{children}</blockquote>,
  ul: ({ children, className }) => <ul className={className === "contains-task-list" ? PROSE.taskList : PROSE.ul}>{children}</ul>,
  ol: ({ children, start }) => <ol start={start} className={PROSE.ol}>{children}</ol>,
  li: ({ children, id }) => <li id={id} className={PROSE.li}>{children}</li>,
  strong: ({ children }) => <strong className={PROSE.strong}>{children}</strong>,
  em: ({ children }) => <em className={PROSE.em}>{children}</em>,
  del: ({ children }) => <del className={PROSE.del}>{children}</del>,
  hr: () => <hr className={PROSE.hr} />,
  table: ({ children }) => (
    <div className={PROSE.tableWrap} tabIndex={0} role="region" aria-label="Table">
      <table className={PROSE.table}>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className={PROSE.thead}>{children}</thead>,
  tr: ({ children }) => <tr className={PROSE.tr}>{children}</tr>,
  th: ({ children, style }) => <th scope="col" style={style} className={PROSE.th}>{children}</th>,
  td: ({ children, style }) => <td style={style} className={PROSE.td}>{children}</td>,

  /* ── Media ────────────────────────────────────────────────────────────── */

  // Figures come from rehypeFigures: a paragraph holding only an image, or a bare <iframe>.
  figure: ({ children, className }) => <figure className={className === "embed" ? PROSE.embed : PROSE.figure}>{children}</figure>,
  figcaption: ({ children }) => <figcaption className={PROSE.figcaption}>{children}</figcaption>,
  img: ({ src, alt = "", title, width, height }) => (
    // Content images come from Markdown with unknown sizes; next/image needs them up front.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={typeof src === "string" ? src : undefined} alt={alt} title={title} width={width} height={height} loading="lazy" decoding="async" className={PROSE.img} />
  ),
  iframe: ({ src, title, height, allow, sandbox, allowFullScreen }) => (
    <iframe
      src={src}
      title={title || "Embedded content"}
      loading="lazy"
      // Sandboxed by default: scripts run, but the page cannot reach the site's storage or navigate it.
      sandbox={sandbox ?? "allow-scripts allow-popups allow-forms"}
      allow={allow}
      allowFullScreen={allowFullScreen}
      referrerPolicy="no-referrer"
      style={height ? { height: /^\d+$/.test(String(height)) ? `${height}px` : String(height) } : undefined}
      className={height ? PROSE.iframeFixed : PROSE.iframe}
    />
  ),
  video: ({ children, src, poster, title }) => (
    <video src={src} poster={poster} title={title} controls preload="metadata" playsInline className={PROSE.img}>
      {children}
    </video>
  ),
  section: ({ children, className, id }) =>
    className?.includes("footnotes") ? (
      <section id={id} data-footnotes className={PROSE.footnotes}>
        {children}
      </section>
    ) : (
      <section className={className}>{children}</section>
    ),
  // GFM task list boxes are read-only; name them so they are not unlabeled form fields.
  input: ({ type, checked }) =>
    type === "checkbox" ? (
      <input type="checkbox" checked={!!checked} disabled readOnly aria-label={checked ? "done" : "not done"} />
    ) : null,
  sup: ({ children }) => <sup className={PROSE.sup}>{children}</sup>,
};

export default function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <div className={PROSE.root}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeSlug, rehypeFigures, rehypeKatex]}
        remarkRehypeOptions={{ footnoteLabel: "Notes", footnoteLabelProperties: { className: ["sr-only"] } }}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
