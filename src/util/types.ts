export interface BaseContent {
  slug: string
  title: string
  description: string
  date: string
  published: boolean
  content: string
}

export interface Project extends BaseContent {
  url?: string
  private?: boolean
  tags?: string[]
  thumbnail?: string
  images?: string[]
  problem?: string
  approach?: string
  results?: string
}

export interface BlogPost extends BaseContent {
  tags?: string[]
  readingTime: number
}

export interface Publication {
  title: string
  authors: string[]
  venue: string
  year: number
  url?: string
  doi?: string
  abstract?: string
  type: 'conference' | 'journal' | 'preprint'
}
