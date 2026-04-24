import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fs from 'fs'
import { getAllPublications } from '../publications'

const mockPublications = [
  {
    title: 'Newer Paper',
    authors: ['Author A'],
    venue: 'IEEE Conference 2024',
    year: 2024,
    type: 'conference' as const,
  },
  {
    title: 'Older Paper',
    authors: ['Author B'],
    venue: 'ACM Workshop 2022',
    year: 2022,
    type: 'conference' as const,
  },
]

describe('getAllPublications', () => {
  let existsSyncSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    existsSyncSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true)
    vi.spyOn(fs, 'readFileSync').mockReturnValue(
      JSON.stringify(mockPublications) as unknown as Buffer
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns publications sorted by year descending', () => {
    const pubs = getAllPublications()
    expect(pubs[0].year).toBe(2024)
    expect(pubs[1].year).toBe(2022)
  })

  it('returns empty array when file does not exist', () => {
    existsSyncSpy.mockReturnValue(false)
    const pubs = getAllPublications()
    expect(pubs).toEqual([])
  })

  it('returns all publications', () => {
    const pubs = getAllPublications()
    expect(pubs).toHaveLength(2)
  })

  it('publication has expected shape', () => {
    const pubs = getAllPublications()
    expect(pubs[0]).toMatchObject({
      title: expect.any(String),
      authors: expect.any(Array),
      venue: expect.any(String),
      year: expect.any(Number),
      type: expect.stringMatching(/^(conference|journal|preprint)$/),
    })
  })
})
