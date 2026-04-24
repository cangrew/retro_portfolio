import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

vi.mock('@/components/navigation', () => ({ default: () => null }))
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
    expect(screen.getByText('Test Post Title')).toBeInTheDocument()
  })

  it('renders blog post description', () => {
    render(<BlogPage />)
    expect(screen.getByText('A test post description')).toBeInTheDocument()
  })

  it('renders reading time in short format', () => {
    render(<BlogPage />)
    expect(screen.getByText('5m')).toBeInTheDocument()
  })

  it('renders post tags', () => {
    render(<BlogPage />)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
  })

  it('links each post to its slug URL', () => {
    render(<BlogPage />)
    const link = screen.getByRole('link', { name: /test post title/i })
    expect(link).toHaveAttribute('href', '/blog/test-post')
  })

  it('renders date column', () => {
    render(<BlogPage />)
    expect(screen.getByText('2026-01-01')).toBeInTheDocument()
  })
})
