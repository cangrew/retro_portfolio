import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { getAllProjects } from "@/util/mdx";
import { getAllBlogPosts } from "@/util/blog";
import { getAllPublications } from "@/util/publications";
import { Section } from "@/components/ui/section";
import { KeyValue } from "@/components/ui/key-value";
import { Kbd } from "@/components/ui/kbd";
import { RowList } from "@/components/ui/row-list";
import { rowClass, rowMuted, rowSubtle } from "@/components/ui/row-styles";
import { Category } from "@/components/content/category";
import { EDUCATION, EXPERIENCE, LINKS, PROFILE, SKILLS, type Entry } from "@/data/profile";

const byDate = <T extends { date: string }>(a: T, b: T) => new Date(b.date).getTime() - new Date(a.date).getTime();

function Entries({ entries }: { entries: Entry[] }) {
  return (
    <ul className="space-y-4">
      {entries.map((e) => (
        <li key={e.title + e.date}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p>
              <span className="font-medium text-fg">{e.title}</span>
              <span className="text-fg-muted"> · {e.where}</span>
            </p>
            <span className="text-sm text-fg-subtle">{e.date}</span>
          </div>
          <ul className="mt-1 list-['-_'] space-y-0.5 pl-5 text-sm text-fg-muted marker:text-fg-subtle">
            {e.bullets.map((b) => (
              <li key={b} className="pl-1">
                {b}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function external(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/**
 * The whole site in one page, like an extended resume: who Andres is, what
 * the research is about, the main projects, work history and the latest posts.
 * Projects and Blog have their own pages for the full lists.
 */
export default function HomePage() {
  const allProjects = getAllProjects().filter((p) => p.published).sort(byDate);
  const allPosts = getAllBlogPosts().filter((p) => p.published).sort(byDate);
  const publications = getAllPublications();
  const projects = allProjects.slice(0, 6);
  const posts = allPosts.slice(0, 3);

  return (
    <main className="space-y-12">
      <Analytics />

      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-fg sm:text-4xl">Andres Delgado</h1>
        <p className="max-w-prose text-lg leading-relaxed text-fg-muted">
          PhD student in computer architecture at UCF. I study how processors keep confidential workloads safe:
          trusted execution environments, memory encryption, and what those defenses cost.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} {...external(l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </header>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="min-w-0 space-y-12">
          <Section id="about" title="about" className="scroll-mt-28">
            <div className="max-w-prose space-y-3 leading-relaxed">
              <p>
                I work on memory encryption and the secure processor stack, studying where today&apos;s defenses for
                confidential computing succeed and where they break down. I measure their microarchitectural cost with
                the gem5 full-system simulator, running large experiments on Azure. I came to the PhD straight from my
                bachelor&apos;s.
              </p>
              <p className="text-fg-muted">
                Outside research I play classical and electric guitar (metal and hardcore, mostly), read a lot of
                science fiction, and keep up with philosophy and religion. I&apos;m an alumnus of Phi Mu Alpha
                Sinfonia, Mu Eta chapter, where I served as chapter president.
              </p>
            </div>
          </Section>

          <Section id="research" title="research" meta={`${publications.length} publication${publications.length === 1 ? "" : "s"}`} className="scroll-mt-28">
            <ol className="space-y-4">
              {publications.map((pub) => (
                <li key={pub.title} className="space-y-0.5">
                  <p className="font-medium">
                    {pub.url ? (
                      <a href={pub.url} target="_blank" rel="noopener noreferrer">
                        {pub.title}
                      </a>
                    ) : (
                      pub.title
                    )}
                  </p>
                  <p className="text-sm text-fg-muted">{pub.authors.join(", ")}</p>
                  <p className="text-sm text-fg-subtle">
                    {pub.venue} · {pub.year}
                  </p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="projects" title="projects" meta={`${projects.length} of ${allProjects.length}`} className="scroll-mt-28">
            <RowList>
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className={`${rowClass} grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)_6.5rem]`}>
                    <span className="truncate font-medium">{p.title}</span>
                    <span className={`truncate text-xs sm:text-sm ${rowMuted}`}>{p.description}</span>
                    <Category category={p.category} className="hidden text-right text-xs group-focus-visible:text-accent-fg sm:block" />
                  </Link>
                </li>
              ))}
            </RowList>
            <p className="mt-3 text-xs text-fg-subtle">
              <Link href="/projects">all projects</Link> <Kbd>2</Kbd>
            </p>
          </Section>

          <Section id="experience" title="experience" className="scroll-mt-28">
            <Entries entries={EXPERIENCE} />
          </Section>

          {posts.length > 0 && (
            <Section id="writing" title="writing" meta={`${posts.length} of ${allPosts.length}`} className="scroll-mt-28">
              <RowList>
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className={`${rowClass} grid grid-cols-[6.5rem_minmax(0,1fr)]`}>
                      <span className={rowSubtle}>{p.date.slice(0, 10)}</span>
                      <span className="truncate">{p.title}</span>
                    </Link>
                  </li>
                ))}
              </RowList>
              <p className="mt-3 text-xs text-fg-subtle">
                <Link href="/blog">all posts</Link> <Kbd>3</Kbd>
              </p>
            </Section>
          )}
        </div>

        <aside className="min-w-0 space-y-12">
          <Section title="profile">
            <KeyValue items={PROFILE} />
          </Section>
          <Section id="education" title="education" className="scroll-mt-28">
            <Entries entries={EDUCATION} />
          </Section>
          <Section id="skills" title="skills" className="scroll-mt-28">
            <KeyValue items={SKILLS} />
          </Section>
        </aside>
      </div>
    </main>
  );
}
