"use client";
import { useState } from "react";
import Link from "next/link";
import type { Project, ProjectCategory } from "@/util/types";
import { PROJECT_CATEGORIES } from "@/util/types";
import CategoryBadge from "@/components/category-badge";

type Filter = ProjectCategory | "all";

const FILTER_LABELS: Record<Filter, string> = {
  all:          "ALL",
  personal:     "PERSONAL",
  research:     "RESEARCH",
  professional: "PROFESSIONAL",
};

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("all");

  const visible = active === "all"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <>
      {/* Filter row */}
      <div className="flex flex-wrap gap-1 mb-4">
        <span className="font-pixel text-pixel-xs text-retro-fg-dim mr-2 self-center">FILTER:</span>
        {(["all", ...PROJECT_CATEGORIES] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`font-pixel text-[8px] leading-tight uppercase border px-2 py-2.5 min-h-[44px] flex items-center transition-none cursor-pointer ${
              active === f
                ? "retro-inset text-retro-green border-retro-green"
                : "retro-raised text-retro-fg-dim border-retro-border-lt hover:text-retro-green"
            }`}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="font-mono text-sm text-retro-fg-dim">No projects in this category.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="retro-raised bg-retro-panel-alt flex flex-col p-3 sm:p-4 no-underline group transition-none"
            >
              {/* Top row: badge + date */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <CategoryBadge category={project.category} size="sm" />
                <span className="font-mono text-xs text-retro-fg-dim whitespace-nowrap shrink-0">
                  {project.date.slice(0, 7)}
                </span>
              </div>

              <div className="font-pixel text-pixel-xs text-retro-green group-hover:text-retro-cyan mb-2 leading-relaxed">
                {project.title}
              </div>
              <p className="font-mono text-xs text-retro-fg-dim line-clamp-3 mb-3 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-auto">
                {(project.tags ?? []).slice(0, 3).map((tag) => (
                  <span key={tag} className="font-mono text-xs text-retro-cyan border border-retro-cyan px-1">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
