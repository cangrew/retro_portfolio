import { getAllBlogPosts } from "@/util/blog";
import { PageHeader } from "@/components/content/page-header";
import { BlogIndex } from "@/components/content/blog-index";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllBlogPosts()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    // The index needs no post bodies; keep them out of the client payload.
    .map(({ slug, title, description, date, readingTime, tags }) => ({ slug, title, description, date, readingTime, tags: tags ?? [] }));

  return (
    <main className="space-y-10">
      <PageHeader title="Blog">Notes on computer architecture, security and the tools around them.</PageHeader>
      {posts.length === 0 ? <p className="text-sm text-fg-muted">No posts yet.</p> : <BlogIndex posts={posts} />}
    </main>
  );
}
