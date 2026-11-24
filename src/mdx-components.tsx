import type { MDXComponents } from "mdx/types";
import { PROSE } from "@/components/content/prose-styles";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: (props) => <h2 {...props} className={PROSE.h1} />,
    h2: (props) => <h2 {...props} className={PROSE.h2} />,
    h3: (props) => <h3 {...props} className={PROSE.h3} />,
    h4: (props) => <h4 {...props} className={PROSE.h4} />,
    p: (props) => <p {...props} className={PROSE.p} />,
    a: (props) => <a {...props} className={PROSE.a} />,
    code: (props) => <code {...props} className={props.className ?? PROSE.code} />,
    pre: (props) => <pre {...props} className={PROSE.pre} />,
    blockquote: (props) => <blockquote {...props} className={PROSE.blockquote} />,
    ul: (props) => <ul {...props} className={PROSE.ul} />,
    ol: (props) => <ol {...props} className={PROSE.ol} />,
    li: (props) => <li {...props} className={PROSE.li} />,
    strong: (props) => <strong {...props} className={PROSE.strong} />,
    hr: () => <hr className={PROSE.hr} />,
  };
}
