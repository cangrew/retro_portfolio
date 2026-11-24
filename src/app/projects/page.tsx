import { getAllProjects } from "@/util/mdx";
import { PageHeader } from "@/components/content/page-header";
import ProjectsGrid from "./projects-grid";

export default function ProjectsPage() {
  const projects = getAllProjects()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="space-y-8">
      <PageHeader title="Projects">Simulators, systems work and the odd website, newest first.</PageHeader>
      {projects.length === 0 ? (
        <p className="text-sm text-fg-muted">No published projects yet.</p>
      ) : (
        <ProjectsGrid projects={projects} />
      )}
    </main>
  );
}
