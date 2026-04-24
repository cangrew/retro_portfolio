import { describe, it, expect } from 'vitest'
import path from 'path'
import { getAllContent, getContent } from '../content'
import { Project } from '../types'

const PROJECT_FIXTURE_DIR = path.join(process.cwd(), 'src/test/fixtures/projects')

function mapProject(data: Record<string, unknown>, slug: string, content: string): Project {
  return {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    published: Boolean(data.published ?? false),
    content,
    url: data.url ? String(data.url) : undefined,
    private: Boolean(data.private ?? true),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    thumbnail: data.thumbnail ? String(data.thumbnail) : undefined,
    images: Array.isArray(data.images) ? (data.images as string[]) : [],
    problem: data.problem ? String(data.problem) : undefined,
    approach: data.approach ? String(data.approach) : undefined,
    results: data.results ? String(data.results) : undefined,
  }
}

describe('project content reader (refactored mdx.ts)', () => {
  it('returns published projects from fixture dir', () => {
    const projects = getAllContent<Project>(PROJECT_FIXTURE_DIR, mapProject)
    expect(projects.length).toBeGreaterThan(0)
    expect(projects.every((p) => p.published)).toBe(true)
  })

  it('project has expected shape', () => {
    const projects = getAllContent<Project>(PROJECT_FIXTURE_DIR, mapProject)
    const project = projects[0]
    expect(project).toMatchObject({
      slug: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      date: expect.any(String),
      published: true,
      content: expect.any(String),
    })
  })

  it('project includes tags array', () => {
    const project = getContent<Project>(PROJECT_FIXTURE_DIR, 'test-project', mapProject)
    expect(project?.tags).toEqual(['C++', 'Simulation'])
  })

  it('returns null for non-existent slug', () => {
    const project = getContent<Project>(PROJECT_FIXTURE_DIR, 'nonexistent', mapProject)
    expect(project).toBeNull()
  })
})
