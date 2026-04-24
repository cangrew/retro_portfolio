'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/card'
import TagFilter from '@/components/tag-filter'
import { Project } from '@/util/types'

interface ProjectGridProps {
  allProjects: Project[]
  allTags: string[]
}

export default function ProjectGrid({ allProjects, allTags }: ProjectGridProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const filtered =
    selectedTags.length === 0
      ? allProjects
      : allProjects.filter((p) => selectedTags.every((t) => p.tags?.includes(t)))

  const featured = filtered.find((p) => p.title === 'BranchPredictionSim')
  const featured2 = filtered.find((p) => p.title === 'Cache_Simulator')

  const sorted = filtered
    .filter((p) => p.title !== 'BranchPredictionSim' && p.title !== 'Cache_Simulator')
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime()
    )

  return (
    <div className="space-y-8">
      {allTags.length > 0 && (
        <TagFilter allTags={allTags} selectedTags={selectedTags} onTagToggle={toggleTag} />
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-zinc-500 py-8">No projects match the selected filters.</p>
      ) : (
        <>
          {(featured || featured2) && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {featured && (
                <Link href={`/projects/${featured.slug}`}>
                  <Card>
                    <article className="relative w-full h-full mb-4">
                      <h2 className="mt-4 text-2xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display">
                        {featured.title}
                      </h2>
                      <div className="text-xs text-zinc-100 mb-2">
                        {featured.date ? (
                          <time dateTime={new Date(featured.date).toISOString()}>
                            {Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
                              new Date(featured.date)
                            )}
                          </time>
                        ) : (
                          <span>SOON</span>
                        )}
                      </div>
                      <p className="mt-4 leading-8 duration-150 text-zinc-300 mb-4">
                        {featured.description}
                      </p>
                      <TagBadges tags={featured.tags} />
                    </article>
                  </Card>
                </Link>
              )}
              {featured2 && (
                <Link href={`/projects/${featured2.slug}`}>
                  <Card>
                    <article className="relative w-full h-full mb-4">
                      <h2 className="mt-4 text-2xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display">
                        {featured2.title}
                      </h2>
                      <div className="text-xs text-zinc-100 mb-2">
                        {featured2.date ? (
                          <time dateTime={new Date(featured2.date).toISOString()}>
                            {Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
                              new Date(featured2.date)
                            )}
                          </time>
                        ) : (
                          <span>SOON</span>
                        )}
                      </div>
                      <p className="mt-4 leading-8 duration-150 text-zinc-300 mb-4">
                        {featured2.description}
                      </p>
                      <TagBadges tags={featured2.tags} />
                    </article>
                  </Card>
                </Link>
              )}
            </div>
          )}

          {sorted.length > 0 && (
            <>
              <div className="w-full h-px bg-gradient-to-r from-zinc-600/0 via-zinc-600/100 to-zinc-600/0" />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sorted.map((project) => (
                  <Link
                    key={project.slug}
                    href={!project.private ? (project.url ?? `/projects/${project.slug}`) : `/projects/${project.slug}`}
                  >
                    <Card>
                      <h2 className="text-2xl font-semibold text-zinc-100">{project.title}</h2>
                      <div className="text-xs text-zinc-100 mb-2">
                        {project.date ? (
                          <time dateTime={new Date(project.date).toISOString()}>
                            {Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
                              new Date(project.date)
                            )}
                          </time>
                        ) : (
                          <span>SOON</span>
                        )}
                      </div>
                      <p className="text-sm text-zinc-300 mb-4">
                        {project.description || 'No description provided.'}
                      </p>
                      <TagBadges tags={project.tags} />
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

function TagBadges({ tags }: { tags?: string[] }) {
  if (!tags || tags.length === 0) return null
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, 4).map((tag) => (
        <span key={tag} className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
          {tag}
        </span>
      ))}
      {tags.length > 4 && (
        <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">
          +{tags.length - 4}
        </span>
      )}
    </div>
  )
}
