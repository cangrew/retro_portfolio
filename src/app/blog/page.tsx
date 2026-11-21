import Link from "next/link";
import { getAllBlogPosts } from "@/util/blog";
import { PageHeader } from "@/components/content/page-header";
import { RowList } from "@/components/ui/row-list";
import { rowClass, rowMuted, rowSubtle } from "@/components/ui/row-styles";
import { Tags } from "@/components/content/tags";

const COLS = "grid grid-cols-[6.5rem_minmax(0,1fr)] sm:grid-cols-[6.5rem_minmax(0,1fr)_3rem] lg:grid-cols-[6.5rem_minmax(0,1fr)_3rem_12rem]";

export default function BlogPage() {
  const posts = getAllBlogPosts()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="space-y-8">
      <PageHeader title="Blog">Notes on computer architecture, security and the tools around them.</PageHeader>

      {posts.length === 0 ? (
        <p className="text-sm text-fg-muted">No posts yet.</p>
      ) : (
        <div>
          <div aria-hidden className={`${COLS} hidden gap-x-3 bg-chrome px-2 py-1 text-xs font-bold text-fg-muted sm:grid`}>
            <span>date</span>
            <span>title</span>
            <span>time</span>
            <span className="hidden lg:block">tags</span>
          </div>
          <RowList className="sm:mx-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className={`${rowClass} ${COLS}`}>
                  <span className={rowSubtle}>{post.date.slice(0, 10)}</span>
                  <span className="min-w-0">
                    <span className="block font-medium">{post.title}</span>
                    {post.description && <span className={`block truncate text-xs ${rowMuted}`}>{post.description}</span>}
                  </span>
                  <span className={`hidden sm:block ${rowSubtle}`}>{post.readingTime}m</span>
                  <Tags tags={post.tags?.slice(0, 3)} className="hidden text-xs group-focus-visible:text-accent-fg lg:inline-flex" />
                </Link>
              </li>
            ))}
          </RowList>
        </div>
      )}
    </main>
  );
}
