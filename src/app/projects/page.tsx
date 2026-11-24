import Link from "next/link";
import { getAllProjects } from "@/util/mdx";
import type { Project, ProjectCategory } from "@/util/types";
import { PageHeader } from "@/components/content/page-header";
import { Section } from "@/components/ui/section";
import { RowList } from "@/components/ui/row-list";
import { rowClass, rowMuted, rowSubtle } from "@/components/ui/row-styles";

/** Research first: it is what the site is about. */
const GROUPS: ProjectCategory[] = ["research", "professional", "personal"];

function ProjectRows({ projects }: { projects: Project[] }) {
  return (
    <RowList>
      {projects.map((p) => (
        <li key={p.slug}>
          <Link
            href={`/projects/${p.slug}`}
            className={`${rowClass} grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_2.5rem]`}
          >
            <span className="truncate font-medium">{p.title}</span>
            <span className={`col-span-2 row-start-2 line-clamp-2 text-xs sm:col-span-1 sm:row-start-auto sm:truncate sm:text-sm ${rowMuted}`}>
              {p.description}
            </span>
            <span className={`col-start-2 row-start-1 text-right text-xs sm:col-start-auto sm:row-start-auto sm:text-sm ${rowSubtle}`}>
              {p.date.slice(0, 4)}
            </span>
          </Link>
        </li>
      ))}
    </RowList>
  );
}

export default function ProjectsPage() {
  const projects = getAllProjects()
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="space-y-10">
      <PageHeader title="Projects">Simulators, systems work and the odd website.</PageHeader>
      {projects.length === 0 ? (
        <p className="text-sm text-fg-muted">No published projects yet.</p>
      ) : (
        GROUPS.map((group) => {
          const items = projects.filter((p) => p.category === group);
          if (items.length === 0) return null;
          return (
            <Section key={group} title={group} meta={items.length}>
              <ProjectRows projects={items} />
            </Section>
          );
        })
      )}
    </main>
  );
}
