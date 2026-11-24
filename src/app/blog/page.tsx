import Link from "next/link";
import { getAllBlogPosts } from "@/util/blog";
import { PageHeader } from "@/components/content/page-header";
import { Section } from "@/components/ui/section";
import { RowList } from "@/components/ui/row-list";
import { rowClass, rowMuted, rowSubtle } from "@/components/ui/row-styles";

export default function BlogPage() {
  const posts = getAllBlogPosts()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="space-y-10">
      <PageHeader title="Blog">Notes on computer architecture, security and the tools around them.</PageHeader>

      {posts.length === 0 ? (
        <p className="text-sm text-fg-muted">No posts yet.</p>
      ) : (
        <Section title="posts" meta={posts.length}>
          <RowList>
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={`${rowClass} grid grid-cols-[minmax(0,1fr)] gap-y-0.5 py-2 sm:grid-cols-[6.5rem_minmax(0,1fr)]`}
                >
                  <span className={`text-xs sm:row-span-2 sm:text-sm ${rowSubtle}`}>
                    {post.date.slice(0, 10)}
                  </span>
                  <span className="font-medium">
                    {post.title}
                    <span className={`ml-2 whitespace-nowrap font-normal ${rowSubtle}`}>{post.readingTime}m</span>
                  </span>
                  {post.description && <span className={`line-clamp-2 max-w-prose text-xs ${rowMuted}`}>{post.description}</span>}
                </Link>
              </li>
            ))}
          </RowList>
        </Section>
      )}
    </main>
  );
}
