import Link from "next/link";
import { getAllProjects } from "@/util/mdx";
import RetroWindow from "@/components/retro-window";
import PixelDivider from "@/components/pixel-divider";

export default function ProjectsPage() {
  const projects = getAllProjects()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const allTags = [...new Set(projects.flatMap((p) => p.tags ?? []))].sort();

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <RetroWindow title="PROJECTS/">
          <PixelDivider variant="pixel-line" className="-mx-4 -mt-4 mb-4" />

          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              <span className="font-pixel text-pixel-xs text-retro-fg-dim mr-2">TAGS:</span>
              {allTags.map((tag) => (
                <span key={tag} className="font-mono text-xs text-retro-cyan border border-retro-cyan px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {projects.length === 0 ? (
            <p className="font-mono text-sm text-retro-fg-dim">No published projects yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="retro-raised bg-retro-panel-alt flex flex-col p-4 no-underline group transition-none"
                >
                  <div className="font-pixel text-pixel-xs text-retro-green group-hover:text-retro-cyan mb-2 leading-relaxed">
                    {project.title}
                  </div>
                  <p className="font-mono text-xs text-retro-fg-dim line-clamp-3 mb-3 flex-1">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between gap-2 mt-auto">
                    <div className="flex flex-wrap gap-1">
                      {(project.tags ?? []).slice(0, 3).map((tag) => (
                        <span key={tag} className="font-mono text-xs text-retro-cyan border border-retro-cyan px-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-xs text-retro-fg-dim whitespace-nowrap shrink-0">
                      {project.date.slice(0, 7)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </RetroWindow>
      </div>
    </main>
  );
}
