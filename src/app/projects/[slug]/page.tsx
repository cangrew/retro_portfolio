import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getAllProjects } from "@/util/mdx";
import MarkdownContent from "@/components/md-content";
import { PageHeader } from "@/components/content/page-header";
import { Category } from "@/components/content/category";
import { Tags } from "@/components/content/tags";
import { Section } from "@/components/ui/section";
import { KeyValue } from "@/components/ui/key-value";
import { buttonVariants } from "@/components/ui/button-variants";
import { TableOfContents } from "@/components/content/toc";
import { tableOfContents } from "@/util/toc";
import { ExternalLink, Github } from "lucide-react";

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

  const toc = tableOfContents(project.content);
  const onGithub = project.url?.includes("github.com");
  const LinkIcon = onGithub ? Github : ExternalLink;

  return (
    <main className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm">
          <Link href="/projects">← projects</Link>
        </p>
        <PageHeader
          title={project.title}
          actions={
            project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "primary" })}>
                <LinkIcon aria-hidden />
                {onGithub ? "view source" : "visit site"}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )
          }
        >
          {project.description}
        </PageHeader>
      </div>

      {project.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.thumbnail} alt="" className="aspect-[21/9] w-full border border-line object-cover" />
      )}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="min-w-0 space-y-10">
          {caseStudy.length > 0 && (
            <Section title="overview">
              <dl className="grid max-w-prose gap-x-6 gap-y-4 text-sm sm:grid-cols-[6rem_minmax(0,1fr)]">
                {caseStudy.map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt className="font-bold text-accent">{label}</dt>
                    <dd className="leading-relaxed text-fg-muted">{value}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}
          {project.images && project.images.length > 0 && (
            <Section title="gallery" meta={project.images.length}>
              <ul className="grid gap-6 sm:grid-cols-2">
                {project.images.map((img) => (
                  <li key={img.src}>
                    <figure className="space-y-2">
                      <a href={img.src} className="block no-underline">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.src} alt={img.alt} loading="lazy" className="aspect-video w-full border border-line bg-pane object-cover hover:border-accent" />
                        <span className="sr-only">Open full size</span>
                      </a>
                      {img.caption && <figcaption className="text-sm text-fg-subtle">{img.caption}</figcaption>}
                    </figure>
                  </li>
                ))}
              </ul>
            </Section>
          )}
          <Section title="write-up">
            <article className="max-w-prose min-w-0">
              <MarkdownContent markdown={project.content} />
            </article>
          </Section>
        </div>

        <aside className="order-first min-w-0 space-y-10 lg:order-none">
          <Section title="details">
            <KeyValue items={details} />
          </Section>
          {toc.length > 1 && (
            <div className="hidden lg:sticky lg:top-28 lg:block">
              <Section title="contents">
                <TableOfContents entries={toc} />
              </Section>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
