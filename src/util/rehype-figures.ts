import type { Element, ElementContent, Parent, Root } from "hast";

/*
 * Turns standalone media in rendered Markdown into <figure>s:
 *
 *   ![A cache miss curve](/blog/cache.png "Miss rate against cache size")
 *     → <figure><img alt="A cache miss curve"><figcaption>Miss rate against cache size</figcaption></figure>
 *
 *   <iframe src="/artifacts/demo/index.html" title="Live demo"></iframe>
 *     → <figure><iframe …><figcaption>Live demo · open in a new tab</figcaption></figure>
 *
 * An image inside running text stays inline. The image's title becomes the
 * caption; the alt text stays for screen readers.
 */

const isElement = (n: unknown, tag?: string): n is Element =>
  typeof n === "object" && n !== null && (n as Element).type === "element" && (tag === undefined || (n as Element).tagName === tag);

const isBlank = (n: ElementContent) => n.type === "text" && n.value.trim() === "";

function text(value: string): ElementContent {
  return { type: "text", value };
}

function caption(children: ElementContent[]): Element {
  return { type: "element", tagName: "figcaption", properties: {}, children };
}

/** The lone image in a paragraph, possibly wrapped in a link. */
function loneImage(p: Element): { node: Element; img: Element } | null {
  const kids = p.children.filter((c) => !isBlank(c));
  if (kids.length !== 1) return null;
  const only = kids[0];
  if (!isElement(only)) return null;
  if (only.tagName === "img") return { node: only, img: only };
  if (only.tagName === "a") {
    const inner = only.children.filter((c) => !isBlank(c));
    if (inner.length === 1 && isElement(inner[0], "img")) return { node: only, img: inner[0] };
  }
  return null;
}

function imageFigure(p: Element): Element | null {
  const found = loneImage(p);
  if (!found) return null;
  const title = found.img.properties.title;
  delete found.img.properties.title;
  const children: ElementContent[] = [found.node];
  if (typeof title === "string" && title.trim()) children.push(caption([text(title)]));
  return { type: "element", tagName: "figure", properties: {}, children };
}

function embedFigure(iframe: Element): Element {
  const title = typeof iframe.properties.title === "string" ? iframe.properties.title : "";
  const src = typeof iframe.properties.src === "string" ? iframe.properties.src : "";
  const parts: ElementContent[] = [];
  if (title) parts.push(text(title));
  if (src) {
    if (title) parts.push(text(" · "));
    parts.push({
      type: "element",
      tagName: "a",
      properties: { href: src, target: "_blank", rel: "noopener noreferrer" },
      children: [text("open full screen ↗")],
    });
  }
  return {
    type: "element",
    tagName: "figure",
    properties: { className: ["embed"] },
    children: [iframe, ...(parts.length ? [caption(parts)] : [])],
  };
}

function walk(parent: Parent, inFigure: boolean) {
  parent.children.forEach((child, i) => {
    if (!isElement(child)) return;
    if (!inFigure && child.tagName === "p") {
      const fig = imageFigure(child);
      if (fig) {
        parent.children[i] = fig;
        return;
      }
      // An iframe alone in a paragraph (Markdown wraps inline HTML in one).
      const kids = child.children.filter((c) => !isBlank(c));
      if (kids.length === 1 && isElement(kids[0], "iframe")) {
        parent.children[i] = embedFigure(kids[0]);
        return;
      }
    }
    if (!inFigure && child.tagName === "iframe") {
      parent.children[i] = embedFigure(child);
      return;
    }
    walk(child, inFigure || child.tagName === "figure");
  });
}

export function rehypeFigures() {
  return (tree: Root) => walk(tree, false);
}
