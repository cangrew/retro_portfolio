"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project, ProjectCategory } from "@/util/types";
import { PROJECT_CATEGORIES } from "@/util/types";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { RowList } from "@/components/ui/row-list";
import { rowClass, rowMuted, rowSubtle } from "@/components/ui/row-styles";
import { Category } from "@/components/content/category";
import { Tags } from "@/components/content/tags";

type Filter = ProjectCategory | "all";
const FILTERS: Filter[] = ["all", ...PROJECT_CATEGORIES];

const COLS = "grid grid-cols-[4.5rem_minmax(0,1fr)] md:grid-cols-[4.5rem_7.5rem_minmax(0,16rem)_minmax(0,1fr)]";

function ProjectTable({ projects: visible, total }: { projects: Project[]; total: number }) {
  return (
    <div className="space-y-3">
      <div>
        <div aria-hidden className={`${COLS} hidden gap-x-3 bg-chrome px-2 py-1 text-xs font-bold text-fg-muted md:grid`}>
          <span>date</span>
          <span>category</span>
          <span>name</span>
          <span>description</span>
        </div>
        {visible.length === 0 ? (
          <p className="px-2 py-3 text-sm text-fg-muted">No projects in this category.</p>
        ) : (
          <RowList className="md:mx-2">
            {visible.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className={`${rowClass} ${COLS}`}>
                  <span className={rowSubtle}>{p.date.slice(0, 7)}</span>
                  <Category category={p.category} className="hidden group-focus-visible:text-accent-fg md:block" />
                  <span className="truncate font-medium">{p.title}</span>
                  <span className={`col-start-2 min-w-0 md:col-start-auto ${rowMuted}`}>
                    <span className="block truncate">{p.description}</span>
                    <Tags tags={p.tags?.slice(0, 4)} className="hidden text-xs group-focus-visible:text-accent-fg md:flex" />
                  </span>
                </Link>
              </li>
            ))}
          </RowList>
        )}
      </div>
      <p className="text-xs text-fg-subtle">
        {visible.length} of {total} · ↑↓ or j/k to move · enter to open
      </p>
    </div>
  );
}

/** The project list as a TUI table: a filter tab row, a header row, one selectable row per project. */
export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("all");
  const count = (f: Filter) => (f === "all" ? projects.length : projects.filter((p) => p.category === f).length);

  return (
    <Tabs value={active} onValueChange={(v) => setActive(v as Filter)} className="space-y-4">
      <TabsList aria-label="Filter by category" className="overflow-x-auto">
        {FILTERS.map((f) => (
          <TabsTab key={f} value={f}>
            {f}
              <span className="ml-1.5 opacity-70">{count(f)}</span>
          </TabsTab>
        ))}
      </TabsList>
      {FILTERS.map((f) => (
        <TabsPanel key={f} value={f}>
          <ProjectTable projects={f === "all" ? projects : projects.filter((p) => p.category === f)} total={projects.length} />
        </TabsPanel>
      ))}
    </Tabs>
  );
}
