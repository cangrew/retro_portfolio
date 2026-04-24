import path from 'path'
import { notFound } from 'next/navigation'
import { getAllContent, getContent } from './content'
import { Project, ProjectCategory, PROJECT_CATEGORIES } from './types'

function parseCategory(value: unknown, slug: string): ProjectCategory {
  if (PROJECT_CATEGORIES.includes(value as ProjectCategory)) {
    return value as ProjectCategory;
  }
  throw new Error(`Project "${slug}" has invalid or missing category: "${value}". Must be one of: ${PROJECT_CATEGORIES.join(", ")}.`);
}

// Re-export Project type for backwards compatibility
export type { Project } from './types'

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')

function mapProject(
  data: Record<string, unknown>,
  slug: string,
  content: string
): Project {
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
    category: parseCategory(data.category, slug),
  }
}

export function getAllProjects(): Project[] {
  return getAllContent<Project>(PROJECTS_DIR, mapProject)
}

export async function getProject(slug: string): Promise<Project> {
  const project = getContent<Project>(PROJECTS_DIR, slug, mapProject)
  if (!project) return notFound()
  return project
}
