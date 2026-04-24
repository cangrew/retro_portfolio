import { describe, it, expect } from 'vitest'
import path from 'path'
import { getAllContent, getContent, computeReadingTime } from '../content'
import { BaseContent } from '../types'

const FIXTURE_DIR = path.join(process.cwd(), 'src/test/fixtures/content')

function mapBase(data: Record<string, unknown>, slug: string, content: string): BaseContent {
  return {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    published: Boolean(data.published ?? false),
    content,
  }
}

describe('computeReadingTime', () => {
  it('returns 1 for short content', () => {
    const shortText = 'word '.repeat(100)
    expect(computeReadingTime(shortText)).toBe(1)
  })

  it('returns ~1 min for ~200 words', () => {
    const text = 'word '.repeat(200)
    expect(computeReadingTime(text)).toBe(1)
  })

  it('returns ~2 min for ~400 words', () => {
    const text = 'word '.repeat(400)
    expect(computeReadingTime(text)).toBe(2)
  })

  it('returns 1 for empty string', () => {
    expect(computeReadingTime('')).toBe(1)
  })
})

describe('getAllContent', () => {
  it('returns only published items', () => {
    const items = getAllContent(FIXTURE_DIR, mapBase)
    expect(items.every((i) => i.published)).toBe(true)
  })

  it('excludes draft (published: false) items', () => {
    const items = getAllContent(FIXTURE_DIR, mapBase)
    expect(items.find((i) => i.slug === 'draft-post')).toBeUndefined()
  })

  it('sorts by date descending (newest first)', () => {
    const items = getAllContent(FIXTURE_DIR, mapBase)
    expect(items[0].slug).toBe('published-post')
    expect(items[1].slug).toBe('older-post')
  })

  it('returns empty array for non-existent directory', () => {
    const items = getAllContent('/non/existent/path', mapBase)
    expect(items).toEqual([])
  })
})

describe('getContent', () => {
  it('returns the correct item by slug', () => {
    const item = getContent(FIXTURE_DIR, 'published-post', mapBase)
    expect(item).not.toBeNull()
    expect(item?.title).toBe('Published Post')
    expect(item?.slug).toBe('published-post')
  })

  it('returns null for non-existent slug', () => {
    const item = getContent(FIXTURE_DIR, 'does-not-exist', mapBase)
    expect(item).toBeNull()
  })

  it('returns content including unpublished items by slug', () => {
    // getContent does not filter by published  -  consumers decide
    const item = getContent(FIXTURE_DIR, 'draft-post', mapBase)
    expect(item).not.toBeNull()
    expect(item?.published).toBe(false)
  })
})
