import path from 'path'
import { getAllContent, getContent, computeReadingTime } from './content'
import { BlogPost } from './types'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

function mapBlogPost(
  data: Record<string, unknown>,
  slug: string,
  content: string
): BlogPost {
  return {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    published: Boolean(data.published ?? false),
    content,
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    readingTime: computeReadingTime(content),
  }
}

export function getAllBlogPosts(): BlogPost[] {
  return getAllContent<BlogPost>(BLOG_DIR, mapBlogPost)
}

export function getBlogPost(slug: string): BlogPost | null {
  return getContent<BlogPost>(BLOG_DIR, slug, mapBlogPost)
}
