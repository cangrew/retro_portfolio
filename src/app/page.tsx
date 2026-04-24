import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { getAllProjects } from "@/util/mdx";
import { getAllBlogPosts } from "@/util/blog";
import RetroWindow from "@/components/retro-window";
import MarqueeTicker from "@/components/marquee-ticker";
import PixelDivider from "@/components/pixel-divider";
import NeonButton from "@/components/neon-button";
import TypewriterText from "@/components/typewriter-text";
import VisitorCounter from "@/components/visitor-counter";

const TICKER_ITEMS = [
  "WELCOME TO MY CORNER OF THE NET",
  "PHD STUDENT @ UCF",
  "COMPUTER ARCHITECTURE & SECURITY",
  "CXL RESEARCH",
  "OPEN TO COLLABORATION",
  "LAST UPDATED: 2026",
];

export default function HomePage() {
  const projects = getAllProjects()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const posts = getAllBlogPosts()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <main className="relative z-10 min-h-screen pt-16 pb-8 px-4 md:px-8">
      <Analytics />

      <div className="max-w-5xl mx-auto space-y-6">
        {/* ── Main window ── */}
        <RetroWindow title="WELCOME.EXE" showControls>
          <MarqueeTicker items={TICKER_ITEMS} className="-mx-4 -mt-4 mb-6" />

          {/* Hero grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left — identity */}
            <div className="space-y-4">
              <div
                className="font-vt text-vt-2xl text-retro-green"
                style={{ textShadow: "0 0 12px #39ff14" }}
              >
                ANDRES<br />DELGADO
              </div>

              <p className="font-mono text-sm text-retro-fg-dim">
                <TypewriterText
                  text="> PhD student in Computer Architecture and Security @ UCF"
                  speed={30}
                />
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <NeonButton href="/projects" color="green">[PROJECTS]</NeonButton>
                <NeonButton href="/research" color="cyan">[RESEARCH]</NeonButton>
                <NeonButton href="/contact" color="magenta">[CONTACT]</NeonButton>
              </div>
            </div>

            {/* Right — profile card */}
            <div className="retro-raised bg-retro-panel-alt p-4 space-y-2">
              <div className="retro-titlebar -mx-4 -mt-4 mb-4">
                <span>■ PROFILE.TXT</span>
                <span className="select-none">[_][□][X]</span>
              </div>
              {[
                ["NAME",     "Andres Delgado"],
                ["CLASS",    "PhD Student"],
                ["SCHOOL",   "Univ. of Central Florida"],
                ["LOCATION", "Orlando, FL"],
                ["FOCUS",    "CXL / Arch. Security"],
                ["STATUS",   "Researching"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-2 font-mono text-sm">
                  <span className="text-retro-green w-20 shrink-0">{label}:</span>
                  <span className="text-retro-fg">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </RetroWindow>

        {/* ── Featured projects ── */}
        <RetroWindow title="FEATURED_PROJECTS/" showControls={false}>
          <PixelDivider variant="pixel-line" className="-mx-4 -mt-4 mb-4" />

          {projects.length === 0 ? (
            <p className="font-mono text-retro-fg-dim text-sm">No published projects yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="retro-raised bg-retro-panel-alt block p-3 no-underline group transition-none"
                >
                  <div className="font-pixel text-pixel-xs text-retro-green group-hover:text-retro-cyan mb-2 truncate">
                    {project.title}
                  </div>
                  <p className="font-mono text-xs text-retro-fg-dim line-clamp-3">
                    {project.description}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs text-retro-cyan border border-retro-cyan px-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-4 text-right">
            <NeonButton href="/projects" color="cyan">[VIEW ALL PROJECTS →]</NeonButton>
          </div>
        </RetroWindow>

        {/* ── Latest blog posts ── */}
        {posts.length > 0 && (
          <RetroWindow title="LATEST_POSTS/" showControls={false}>
            <PixelDivider variant="ascii" className="-mx-4 -mt-4 mb-4" />

            <table className="w-full font-mono text-sm border-collapse">
              <thead>
                <tr className="text-left border-b border-retro-border-lt">
                  <th className="pb-1 pr-4 font-pixel text-pixel-xs text-retro-green font-normal">DATE</th>
                  <th className="pb-1 pr-4 font-pixel text-pixel-xs text-retro-green font-normal">TITLE</th>
                  <th className="pb-1 font-pixel text-pixel-xs text-retro-green font-normal hidden sm:table-cell">TAGS</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.slug} className="border-b border-retro-panel-alt hover:bg-retro-panel-alt">
                    <td className="py-2 pr-4 text-retro-fg-dim whitespace-nowrap">
                      {post.date.slice(0, 10)}
                    </td>
                    <td className="py-2 pr-4">
                      <Link href={`/blog/${post.slug}`} className="text-retro-green hover:text-retro-cyan">
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-2 hidden sm:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {(post.tags ?? []).slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs text-retro-cyan border border-retro-cyan px-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 text-right">
              <NeonButton href="/blog" color="magenta">[READ ALL POSTS →]</NeonButton>
            </div>
          </RetroWindow>
        )}

        {/* ── Footer badges ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1">
          <VisitorCounter />

          <div className="retro-raised bg-retro-panel-alt inline-flex items-center gap-2 px-3 py-1">
            <span className="font-pixel text-pixel-xs text-retro-fg-dim">LAST UPDATED:</span>
            <span className="font-vt text-vt-lg text-retro-green">2026</span>
          </div>

          <div className="font-pixel text-pixel-xs text-retro-fg-dim animate-blink">
            ★ BEST VIEWED IN 1024×768 ★
          </div>
        </div>
      </div>
    </main>
  );
}
