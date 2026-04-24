import { notFound } from "next/navigation";
import { getProject, getAllProjects } from "@/util/mdx";
import ProjectContent from "@/components/md-content";
import RetroWindow from "@/components/retro-window";
import NeonButton from "@/components/neon-button";
import PixelDivider from "@/components/pixel-divider";
import CategoryBadge from "@/components/category-badge";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };
  return { title: project.title, description: project.description };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <RetroWindow title={`PROJECTS/${slug}`}>
          {/* Terminal header */}
          <div className="font-mono text-xs text-retro-fg-dim -mx-4 -mt-4 mb-4 px-4 py-2 bg-retro-bg retro-inset">
            <span className="text-retro-green">$</span>{" "}
            <span className="text-retro-cyan">cat</span>{" "}
            <span className="text-retro-fg">projects/{slug}.mdx</span>
          </div>

          {/* Frontmatter */}
          <div className="font-mono text-xs text-retro-fg-dim mb-4 space-y-0.5">
            <div><span className="text-retro-green">title:</span> {project.title}</div>
            <div><span className="text-retro-green">date:</span>  {project.date.slice(0, 10)}</div>
            <div className="flex gap-2 items-center">
              <span className="text-retro-green">category:</span>
              <CategoryBadge category={project.category} size="md" />
            </div>
            {project.url && (
              <div>
                <span className="text-retro-green">url:</span>{" "}
                <a href={project.url} target="_blank" rel="noopener noreferrer"
                  className="text-retro-cyan hover:text-retro-green">
                  {project.url}
                </a>
              </div>
            )}
            {project.tags && project.tags.length > 0 && (
              <div className="flex gap-1 items-center flex-wrap">
                <span className="text-retro-green">tags:</span>
                {project.tags.map((tag) => (
                  <span key={tag} className="text-retro-cyan border border-retro-cyan px-1">{tag}</span>
                ))}
              </div>
            )}
          </div>

          <PixelDivider variant="ascii" className="-mx-4" />

          {/* Case study blocks */}
          {(project.problem || project.approach || project.results) && (
            <div className="grid md:grid-cols-3 gap-4 my-4">
              {[
                { label: "PROBLEM",  value: project.problem,  color: "var(--retro-magenta)" },
                { label: "APPROACH", value: project.approach, color: "var(--retro-cyan)" },
                { label: "RESULTS",  value: project.results,  color: "var(--retro-green)" },
              ].filter((s) => s.value).map(({ label, value, color }) => (
                <div key={label} className="retro-raised bg-retro-panel-alt p-3 space-y-1">
                  <div className="font-pixel text-pixel-xs" style={{ color }}>{label}</div>
                  <p className="font-mono text-xs text-retro-fg-dim leading-relaxed">{value}</p>
                </div>
              ))}
            </div>
          )}

          {/* MDX content */}
          <div className="mt-4 prose prose-invert prose-sm max-w-none font-mono
            prose-headings:font-pixel prose-headings:text-retro-green
            prose-a:text-retro-cyan prose-a:no-underline hover:prose-a:text-retro-green
            prose-code:text-retro-amber prose-code:bg-retro-bg prose-code:px-1
            prose-pre:bg-retro-bg prose-pre:border prose-pre:border-retro-border-lt
            prose-blockquote:border-l-retro-green prose-blockquote:text-retro-fg-dim
            prose-strong:text-retro-fg">
            <ProjectContent markdown={project.content} />
          </div>
        </RetroWindow>

        <NeonButton href="/projects" color="cyan">[← BACK TO PROJECTS]</NeonButton>
      </div>
    </main>
  );
}
