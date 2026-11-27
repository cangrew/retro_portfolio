import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPost } from "@/util/blog";
import { tableOfContents } from "@/util/toc";
import MarkdownContent from "@/components/md-content";
import { PageHeader } from "@/components/content/page-header";
import { TableOfContents } from "@/components/content/toc";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.description };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const toc = tableOfContents(post.content);
  const posts = getAllBlogPosts()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const i = posts.findIndex((p) => p.slug === post.slug);
  const newer = i > 0 ? posts[i - 1] : undefined;
  const older = i >= 0 && i < posts.length - 1 ? posts[i + 1] : undefined;

  return (
    <main className="space-y-8">
      <div className="space-y-4">
        <p className="text-sm">
          <Link href="/blog">← blog</Link>
        </p>
        <PageHeader title={post.title}>{post.description}</PageHeader>
        <p className="text-sm text-fg-subtle">
          <time dateTime={post.date.slice(0, 10)}>{formatDate(post.date)}</time> · {post.readingTime} min read
        </p>
        {post.tags && post.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
            {post.tags.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid gap-10 border-t border-line pt-6 xl:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="min-w-0 max-w-prose">
          <MarkdownContent markdown={post.content} />
        </article>
        {toc.length > 1 && (
          <>
            {/* Small screens: collapsed above the post, so the text comes first. */}
            <details className="order-first border border-line text-sm xl:hidden">
              <summary className="cursor-pointer select-none px-3 py-2 text-fg-muted hover:bg-chrome">
                contents <span className="text-fg-subtle">({toc.length})</span>
              </summary>
              <TableOfContents entries={toc} className="px-3 pb-3 pt-1" />
            </details>
            <aside className="hidden xl:block">
              <div className="sticky top-28">
                <Section title="contents">
                  <TableOfContents entries={toc} />
                </Section>
              </div>
            </aside>
          </>
        )}
      </div>

      {(newer || older) && (
        <nav aria-label="More posts" className="grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
          {older ? (
            <Link href={`/blog/${older.slug}`} className="group block no-underline">
              <span className="block text-xs text-fg-subtle">← older</span>
              <span className="text-fg group-hover:text-accent">{older.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="group block text-right no-underline">
              <span className="block text-xs text-fg-subtle">newer →</span>
              <span className="text-fg group-hover:text-accent">{newer.title}</span>
            </Link>
          )}
        </nav>
      )}
    </main>
  );
}
