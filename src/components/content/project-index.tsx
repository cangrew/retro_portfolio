"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProjectCategory } from "@/util/types";
import { Section } from "@/components/ui/section";
import { Category } from "./category";
import { FilterChips } from "./filter-chips";

export interface ProjectSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: ProjectCategory;
  tags: string[];
  thumbnail?: string;
  url?: string;
}

/** Research first: it is what the site is about. */
const GROUPS: ProjectCategory[] = ["research", "professional", "personal"];

const BLURB: Record<ProjectCategory, string> = {
  research: "Simulators and systems work from the lab",
  professional: "Built for clients and employers",
  personal: "Side projects and experiments",
};

function ProjectEntry({ p }: { p: ProjectSummary }) {
  return (
    <li className="min-w-0">
      <Link
        href={`/projects/${p.slug}`}
        className="group -mx-2 flex h-full min-w-0 flex-col gap-2 px-2 py-3 text-fg no-underline outline-none hover:bg-chrome hover:no-underline focus-visible:bg-chrome focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-accent"
      >
        {p.thumbnail && (
          // Thumbnails are author content of unknown size.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.thumbnail} alt="" loading="lazy" className="aspect-video w-full border border-line object-cover" />
        )}
        <span className="flex items-baseline justify-between gap-3">
          <span className="min-w-0 truncate font-bold group-hover:text-accent group-focus-visible:text-accent">{p.title}</span>
          <span className="shrink-0 text-xs text-fg-subtle">{p.date.slice(0, 4)}</span>
        </span>
        <span className="line-clamp-2 text-sm leading-relaxed text-fg-muted">{p.description}</span>
        {p.tags.length > 0 && (
          <span className="mt-auto truncate text-xs text-fg-subtle">
            {p.tags.slice(0, 4).map((t, i) => (
              <span key={t}>
                {i > 0 && <span aria-hidden> · </span>}
                {t}
              </span>
            ))}
          </span>
        )}
      </Link>
    </li>
  );
}

/**
 * All projects in a two-column grid, grouped by category, with a filter on
 * top. Projects arrive sorted newest first.
 */
export function ProjectIndex({ projects }: { projects: ProjectSummary[] }) {
  const [category, setCategory] = useState<string | null>(null);
  const options = GROUPS.map((g) => ({ value: g, label: g, count: projects.filter((p) => p.category === g).length })).filter(
    (o) => o.count > 0,
  );
  const groups = GROUPS.filter((g) => category === null || g === category);

  return (
    <div className="space-y-10">
      <FilterChips label="Filter projects by category" options={options} value={category} onChange={setCategory} total={projects.length} />
      <p className="sr-only" aria-live="polite">
        {category ? `Showing ${category} projects` : ""}
      </p>
      {groups.map((g) => {
        const items = projects.filter((p) => p.category === g);
        if (items.length === 0) return null;
        return (
          <Section key={g} title={<Category category={g} />} meta={items.length}>
            <p className="-mt-1 mb-2 text-xs text-fg-subtle">{BLURB[g]}</p>
            <ul className="grid gap-x-10 gap-y-2 md:grid-cols-2">
              {items.map((p) => (
                <ProjectEntry key={p.slug} p={p} />
              ))}
            </ul>
          </Section>
        );
      })}
    </div>
  );
}
