"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { RowList } from "@/components/ui/row-list";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { rowClass, rowSubtle } from "@/components/ui/row-styles";
import { FilterChips } from "./filter-chips";

export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: number;
  tags: string[];
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

/**
 * The blog index: the newest post set large, the rest as an archive grouped
 * by year, and the topics on the side as filters.
 * Posts arrive sorted newest first.
 */
export function BlogIndex({ posts }: { posts: PostSummary[] }) {
  const [tag, setTag] = useState<string | null>(null);

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, label: value.toLowerCase(), count }));
  }, [posts]);

  const shown = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;
  const [latest, ...rest] = shown;
  const years = useMemo(() => {
    const byYear = new Map<string, PostSummary[]>();
    for (const p of rest) {
      const y = p.date.slice(0, 4);
      byYear.set(y, [...(byYear.get(y) ?? []), p]);
    }
    return [...byYear];
  }, [rest]);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,18rem)]">
      <div className="min-w-0 space-y-12">
        <p className="sr-only" aria-live="polite">
          {tag ? `${shown.length} posts tagged ${tag}` : ""}
        </p>
        {latest && (
          <Section title={tag ? "newest match" : "latest"}>
            <article className="space-y-3">
              <p className="text-sm text-fg-subtle">
                <time dateTime={latest.date.slice(0, 10)}>{formatDate(latest.date)}</time> · {latest.readingTime} min read
              </p>
              <h2 className="text-balance text-xl font-bold leading-snug sm:text-2xl">
                <Link href={`/blog/${latest.slug}`} className="text-fg no-underline hover:text-accent">
                  {latest.title}
                </Link>
              </h2>
              {latest.description && <p className="max-w-prose leading-relaxed text-fg-muted">{latest.description}</p>}
              {latest.tags.length > 0 && (
                <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
                  {latest.tags.map((t) => (
                    <li key={t}>
                      <Badge>{t}</Badge>
                    </li>
                  ))}
                </ul>
              )}
              <p className="pt-1 text-sm">
                <Link href={`/blog/${latest.slug}`}>
                  read post<span className="sr-only">: {latest.title}</span> <span aria-hidden>→</span>
                </Link>
              </p>
            </article>
          </Section>
        )}

        {years.map(([year, items]) => (
          <Section key={year} title={year} meta={`${items.length} post${items.length === 1 ? "" : "s"}`}>
            <RowList>
              {items.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className={`${rowClass} grid grid-cols-[4.5rem_minmax(0,1fr)_auto]`}>
                    <span className={`text-xs sm:text-sm ${rowSubtle}`}>{formatDate(p.date).replace(/, \d{4}$/, "")}</span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{p.title}</span>
                    </span>
                    <span className={`text-xs ${rowSubtle}`}>{p.readingTime}m</span>
                  </Link>
                </li>
              ))}
            </RowList>
          </Section>
        ))}

        {shown.length === 0 && <p className="text-sm text-fg-muted">No posts on that topic.</p>}
      </div>

      {topics.length > 0 && (
        <aside className="order-first min-w-0 lg:order-none">
          <Section title="topics" meta={tag ? <button type="button" onClick={() => setTag(null)} className="text-accent underline underline-offset-2">clear</button> : topics.length}>
            <FilterChips label="Filter posts by topic" options={topics} value={tag} onChange={setTag} total={posts.length} />
          </Section>
        </aside>
      )}
    </div>
  );
}
