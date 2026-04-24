import { getAllProjects } from "@/util/mdx";
import RetroWindow from "@/components/retro-window";
import PixelDivider from "@/components/pixel-divider";
import ProjectsGrid from "./projects-grid";

export default function ProjectsPage() {
  const projects = getAllProjects()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <RetroWindow title="PROJECTS/">
          <PixelDivider variant="pixel-line" className="-mx-4 -mt-4 mb-4" />
          {projects.length === 0 ? (
            <p className="font-mono text-sm text-retro-fg-dim">No published projects yet.</p>
          ) : (
            <ProjectsGrid projects={projects} />
          )}
        </RetroWindow>
      </div>
    </main>
  );
}
