import { notFound } from "next/navigation";
import { getAllBlogPosts, getBlogPost } from "@/util/blog";
import ProjectContent from "@/components/md-content";
import RetroWindow from "@/components/retro-window";
import NeonButton from "@/components/neon-button";
import PixelDivider from "@/components/pixel-divider";

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
    <main className="relative z-10 min-h-screen pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <RetroWindow title={`BLOG/${slug}.md`}>
          {/* Terminal read header */}
          <div className="font-mono text-xs text-retro-fg-dim -mx-4 -mt-4 mb-4 px-4 py-2 bg-retro-bg retro-inset">
            <span className="text-retro-green">$</span>{" "}
            <span className="text-retro-cyan">cat</span>{" "}
            <span className="text-retro-fg">posts/{slug}.md</span>
          </div>

          {/* Frontmatter */}
          <div className="font-mono text-xs text-retro-fg-dim mb-4 space-y-0.5">
            <div><span className="text-retro-green">title:</span>  {post.title}</div>
            <div><span className="text-retro-green">date:</span>   {post.date.slice(0, 10)}</div>
            <div><span className="text-retro-green">read:</span>   {post.readingTime} min</div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-1 items-center flex-wrap">
                <span className="text-retro-green">tags:</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="text-retro-cyan border border-retro-cyan px-1">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <PixelDivider variant="ascii" className="-mx-4" />

          {/* MDX content */}
          <div className="mt-4 prose prose-invert prose-sm max-w-none font-mono
            prose-headings:font-pixel prose-headings:text-retro-green
            prose-a:text-retro-cyan prose-a:no-underline hover:prose-a:text-retro-green
            prose-code:text-retro-amber prose-code:bg-retro-bg prose-code:px-1
            prose-pre:bg-retro-bg prose-pre:border prose-pre:border-retro-border-lt
            prose-blockquote:border-l-retro-green prose-blockquote:text-retro-fg-dim
            prose-strong:text-retro-fg">
            <ProjectContent markdown={post.content} />
          </div>
        </RetroWindow>

        <NeonButton href="/blog" color="cyan">[← BACK TO BLOG]</NeonButton>
      </div>
    </main>
  );
}
