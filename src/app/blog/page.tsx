import Link from "next/link";
import { getAllBlogPosts } from "@/util/blog";
import RetroWindow from "@/components/retro-window";
import PixelDivider from "@/components/pixel-divider";

export default function BlogPage() {
  const posts = getAllBlogPosts().filter((p) => p.published);

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <RetroWindow title="BLOG/">
          <PixelDivider variant="pixel-line" className="-mx-4 -mt-4 mb-4" />

          {posts.length === 0 ? (
            <p className="font-mono text-sm text-retro-fg-dim">No posts yet.</p>
          ) : (
            <table className="w-full font-mono text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-retro-border-lt">
                  <th className="pb-2 pr-4 font-pixel text-pixel-xs text-retro-green font-normal">DATE</th>
                  <th className="pb-2 pr-4 font-pixel text-pixel-xs text-retro-green font-normal">TITLE</th>
                  <th className="pb-2 pr-4 font-pixel text-pixel-xs text-retro-green font-normal hidden sm:table-cell">TIME</th>
                  <th className="pb-2 font-pixel text-pixel-xs text-retro-green font-normal hidden md:table-cell">TAGS</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.slug} className="border-b border-retro-panel-alt hover:bg-retro-panel-alt">
                    <td className="py-2 pr-4 text-retro-fg-dim whitespace-nowrap text-xs">
                      {post.date.slice(0, 10)}
                    </td>
                    <td className="py-2 pr-4">
                      <Link href={`/blog/${post.slug}`} className="text-retro-green hover:text-retro-cyan">
                        {post.title}
                      </Link>
                      {post.description && (
                        <p className="text-xs text-retro-fg-dim mt-0.5 line-clamp-1">{post.description}</p>
                      )}
                    </td>
                    <td className="py-2 pr-4 text-retro-fg-dim text-xs hidden sm:table-cell whitespace-nowrap">
                      {post.readingTime}m
                    </td>
                    <td className="py-2 hidden md:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {(post.tags ?? []).slice(0, 2).map((tag) => (
                          <span key={tag} className="font-mono text-xs text-retro-cyan border border-retro-cyan px-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </RetroWindow>
      </div>
    </main>
  );
}
