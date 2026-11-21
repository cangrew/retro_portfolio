import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { getAllProjects } from "@/util/mdx";
import { getAllBlogPosts } from "@/util/blog";
import { Section } from "@/components/ui/section";
import { KeyValue } from "@/components/ui/key-value";
import { Kbd } from "@/components/ui/kbd";
import { RowList } from "@/components/ui/row-list";
import { rowClass, rowMuted, rowSubtle } from "@/components/ui/row-styles";
import { Category } from "@/components/content/category";

const byDate = <T extends { date: string }>(a: T, b: T) => new Date(b.date).getTime() - new Date(a.date).getTime();

const PROFILE = [
  ["role", "PhD student, computer science"],
  ["school", "University of Central Florida"],
  ["focus", "computer architecture, hardware security"],
  ["tools", "gem5, C/C++, Python, Linux"],
  ["location", "Orlando, FL"],
] as const;

export default function HomePage() {
  const allProjects = getAllProjects().filter((p) => p.published).sort(byDate);
  const allPosts = getAllBlogPosts().filter((p) => p.published).sort(byDate);
  const projects = allProjects.slice(0, 5);
  const posts = allPosts.slice(0, 5);

  return (
    <main className="space-y-10">
      <Analytics />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-fg sm:text-4xl">Andres Delgado</h1>
        <p className="max-w-prose text-lg text-fg-muted">
          I study how processors keep confidential workloads safe: trusted execution environments, memory
          encryption, and what those defenses cost.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="min-w-0 space-y-10">
          <Section title="recent projects" meta={`${projects.length} of ${allProjects.length}`}>
            <RowList>
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className={`${rowClass} grid grid-cols-[4.5rem_minmax(0,1fr)]`}>
                    <span className={rowSubtle}>{p.date.slice(0, 7)}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{p.title}</span>
                      <span className={`block truncate text-xs ${rowMuted}`}>{p.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </RowList>
            <p className="mt-3 text-xs text-fg-subtle">
              <Link href="/projects">all projects</Link> <Kbd>2</Kbd>
            </p>
          </Section>

          {posts.length > 0 && (
            <Section title="recent posts" meta={`${posts.length} of ${allPosts.length}`}>
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

        <aside className="min-w-0 space-y-10">
          <Section title="profile">
            <KeyValue items={PROFILE} />
          </Section>
          <Section title="categories">
            <ul className="space-y-1 text-sm">
              {(["research", "professional", "personal"] as const).map((c) => (
                <li key={c} className="flex justify-between gap-4">
                  <Category category={c} />
                  <span className="text-fg-subtle">{allProjects.filter((p) => p.category === c).length}</span>
                </li>
              ))}
            </ul>
          </Section>
        </aside>
      </div>
    </main>
  );
}
