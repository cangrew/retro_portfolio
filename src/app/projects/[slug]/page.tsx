import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getAllProjects } from "@/util/mdx";
import MarkdownContent from "@/components/md-content";
import { PageHeader } from "@/components/content/page-header";
import { Category } from "@/components/content/category";
import { Tags } from "@/components/content/tags";
import { Section } from "@/components/ui/section";
import { KeyValue } from "@/components/ui/key-value";

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

  const details = [
    ["date", project.date.slice(0, 10)],
    ["category", <Category key="c" category={project.category} />],
    ...(project.url
      ? [
          [
            "link",
            <a key="u" href={project.url} target="_blank" rel="noopener noreferrer" className="break-all">
              {project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            </a>,
          ] as const,
        ]
      : []),
    ...(project.tags?.length ? [["tags", <Tags key="t" tags={project.tags} />] as const] : []),
  ] as const;

  const caseStudy = [
    ["problem", project.problem],
    ["approach", project.approach],
    ["results", project.results],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <main className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm">
          <Link href="/projects">← projects</Link>
        </p>
        <PageHeader title={project.title}>{project.description}</PageHeader>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="min-w-0 space-y-10">
          {caseStudy.map(([label, value]) => (
            <Section key={label} title={label}>
              <p className="max-w-prose text-sm leading-relaxed text-fg-muted">{value}</p>
            </Section>
          ))}
          <article className="max-w-prose min-w-0">
            <MarkdownContent markdown={project.content} />
          </article>
        </div>

        <aside className="order-first min-w-0 lg:order-none">
          <Section title="details">
            <KeyValue items={details} />
          </Section>
        </aside>
      </div>
    </main>
  );
}
