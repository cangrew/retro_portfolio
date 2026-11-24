import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPost } from "@/util/blog";
import MarkdownContent from "@/components/md-content";
import { PageHeader } from "@/components/content/page-header";
import { Tags } from "@/components/content/tags";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.description };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm">
          <Link href="/blog">← blog</Link>
        </p>
        <PageHeader title={post.title}>{post.description}</PageHeader>
        <div className="space-y-0.5 text-sm text-fg-subtle">
          <p>
            {post.date.slice(0, 10)} · {post.readingTime} min read
          </p>
          <Tags tags={post.tags} className="block text-xs" />
        </div>
      </div>
      <article className="max-w-prose min-w-0 border-t border-line pt-2">
        <MarkdownContent markdown={post.content} />
      </article>
    </main>
  );
}
