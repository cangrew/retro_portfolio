import { describe, it, expect } from 'vitest'
import path from 'path'

// Override the blog directory to use fixtures
vi.mock('../blog', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../blog')>()
  return actual
})

// We test blog functions by pointing at the fixture directory directly
import { getAllContent, getContent, computeReadingTime } from '../content'
import { BlogPost } from '../types'

const BLOG_FIXTURE_DIR = path.join(process.cwd(), 'src/test/fixtures/blog')

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

describe('blog content reader (via content.ts with fixture dir)', () => {
  it('returns blog posts with readingTime computed', () => {
    const posts = getAllContent<BlogPost>(BLOG_FIXTURE_DIR, mapBlogPost)
    expect(posts.length).toBeGreaterThan(0)
    posts.forEach((post) => {
      expect(typeof post.readingTime).toBe('number')
      expect(post.readingTime).toBeGreaterThanOrEqual(1)
    })
  })

  it('includes tags array from frontmatter', () => {
    const posts = getAllContent<BlogPost>(BLOG_FIXTURE_DIR, mapBlogPost)
    const helloWorld = posts.find((p) => p.slug === 'hello-world')
    expect(helloWorld?.tags).toEqual(['TypeScript', 'Next.js'])
  })

  it('returns correct post by slug', () => {
    const post = getContent<BlogPost>(BLOG_FIXTURE_DIR, 'hello-world', mapBlogPost)
    expect(post).not.toBeNull()
    expect(post?.title).toBe('Hello World')
    expect(post?.slug).toBe('hello-world')
  })

  it('returns null for non-existent slug', () => {
    const post = getContent<BlogPost>(BLOG_FIXTURE_DIR, 'nonexistent', mapBlogPost)
    expect(post).toBeNull()
  })
})
