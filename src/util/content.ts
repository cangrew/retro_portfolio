import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BaseContent } from './types'

export function computeReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export function getAllContent<T extends BaseContent>(
  contentDir: string,
  mapFrontmatter: (data: Record<string, unknown>, slug: string, content: string) => T
): T[] {
  if (!fs.existsSync(contentDir)) return []

  const fileNames = fs.readdirSync(contentDir)
  const items = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(contentDir, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      return mapFrontmatter(data as Record<string, unknown>, slug, content)
    })

  return items
    .filter((item) => item.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getContent<T extends BaseContent>(
  contentDir: string,
  slug: string,
  mapFrontmatter: (data: Record<string, unknown>, slug: string, content: string) => T
): T | null {
  const fullPath = path.join(contentDir, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return mapFrontmatter(data as Record<string, unknown>, slug, content)
}
