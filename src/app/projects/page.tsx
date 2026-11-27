import { getAllProjects } from "@/util/mdx";
import { PageHeader } from "@/components/content/page-header";
import { ProjectIndex } from "@/components/content/project-index";

export const metadata = { title: "Projects" };

export default function ProjectsPage() {
  const projects = getAllProjects()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    // The index needs no project bodies; keep them out of the client payload.
    .map(({ slug, title, description, date, category, tags, thumbnail, url }) => ({
      slug,
      title,
      description,
      date,
      category,
      tags: tags ?? [],
      thumbnail,
      url,
    }));

  return (
    <main className="space-y-10">
      <PageHeader title="Projects">Simulators, systems work and the odd website.</PageHeader>
      {projects.length === 0 ? <p className="text-sm text-fg-muted">No published projects yet.</p> : <ProjectIndex projects={projects} />}
    </main>
  );
}
