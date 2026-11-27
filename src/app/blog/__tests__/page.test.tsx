import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}))
vi.mock('@/util/blog', () => ({
  getAllBlogPosts: () => [
    {
      slug: 'test-post',
      title: 'Test Post Title',
      description: 'A test post description',
      date: '2026-01-01',
      readingTime: 5,
      tags: ['TypeScript', 'Testing'],
      published: true,
      content: 'content here',
    },
  ],
}))

import BlogPage from '../page'

describe('BlogPage', () => {
  it('renders blog post title', () => {
    render(<BlogPage />)
    expect(screen.getByRole('heading', { name: 'Test Post Title' })).toBeInTheDocument()
  })

  it('renders blog post description', () => {
    render(<BlogPage />)
    expect(screen.getByText('A test post description')).toBeInTheDocument()
  })

  it('renders reading time', () => {
    render(<BlogPage />)
    expect(screen.getByText(/5 min read/)).toBeInTheDocument()
  })

  it('shows the latest post\'s tags and offers them as topic filters', () => {
    render(<BlogPage />)
    expect(screen.getByRole('button', { name: /typescript/i })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThan(0)
  })

  it('links each post to its slug URL', () => {
    render(<BlogPage />)
    const link = screen.getByRole('link', { name: 'Test Post Title' })
    expect(link).toHaveAttribute('href', '/blog/test-post')
  })

  it('renders a machine-readable date', () => {
    render(<BlogPage />)
    expect(screen.getByText('Jan 1, 2026')).toHaveAttribute('datetime', '2026-01-01')
  })
})
