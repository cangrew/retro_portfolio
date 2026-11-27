import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import MarkdownContent from '@/components/md-content'
import { tableOfContents } from '../toc'
import { parseImages } from '../mdx'

const html = (md: string) => renderToStaticMarkup(<MarkdownContent markdown={md} />)

describe('MarkdownContent', () => {
  it('turns a standalone image into a figure with its title as the caption', () => {
    const out = html('![A cache curve](/img/curve.png "Miss rate against size")')
    expect(out).toContain('<figure')
    expect(out).toMatch(/<img[^>]*alt="A cache curve"/)
    expect(out).toContain('<figcaption')
    expect(out).toContain('Miss rate against size')
    expect(out).not.toMatch(/<p[^>]*>\s*<figure/)
  })

  it('keeps inline images inline', () => {
    const out = html('Text with ![icon](/i.png) inside.')
    expect(out).not.toContain('<figure')
  })

  it('renders embedded HTML artifacts as sandboxed, titled iframes', () => {
    const out = html('<iframe src="/artifacts/demo/index.html" title="Live demo"></iframe>')
    expect(out).toMatch(/<iframe[^>]*title="Live demo"/)
    expect(out).toMatch(/sandbox="allow-scripts allow-popups allow-forms"/)
    expect(out).toContain('loading="lazy"')
    expect(out).toContain('open full screen')
  })

  it('gives untitled iframes an accessible name', () => {
    expect(html('<iframe src="https://example.com"></iframe>')).toContain('title="Embedded content"')
  })

  it('opens external links in a new tab and says so', () => {
    const out = html('[gem5](https://www.gem5.org)')
    expect(out).toContain('target="_blank"')
    expect(out).toContain('opens in a new tab')
    expect(html('[home](/)')).not.toContain('target=')
  })

  it('gives headings ids and anchor links', () => {
    const out = html('## Memory Encryption Engine')
    expect(out).toContain('id="memory-encryption-engine"')
    expect(out).toContain('href="#memory-encryption-engine"')
  })

  it('labels fenced code with its language and makes it keyboard scrollable', () => {
    const out = html('```cpp\nint x;\n```')
    expect(out).toMatch(/<pre[^>]*tabindex="0"/i)
    expect(out).toContain('cpp')
  })

  it('renders GFM tables, task lists and footnotes', () => {
    const out = html('| a | b |\n|---|---|\n| 1 | 2 |\n\n- [x] done\n\nNote[^1].\n\n[^1]: The note.')
    expect(out).toContain('<table')
    expect(out).toContain('scope="col"')
    expect(out).toContain('type="checkbox"')
    expect(out).toContain('data-footnotes')
  })
})

describe('tableOfContents', () => {
  it('lists ## and ### headings with rehype-slug ids, skipping code and math', () => {
    const md = ['# Title', '## Intro', '```', '## not a heading', '```', '$$', '## also not', '$$', '### Details `code`', '## Intro'].join('\n')
    expect(tableOfContents(md)).toEqual([
      { id: 'intro', text: 'Intro', depth: 2 },
      { id: 'details-code', text: 'Details code', depth: 3 },
      { id: 'intro-1', text: 'Intro', depth: 2 },
    ])
  })
})

describe('tableOfContents ids match the rendered headings', () => {
  it.each(['## Using `foo_bar`', '## *Emphasis* and _more_', '## snake_case name', '## A [link](/x) here'])('%s', (md) => {
    const [entry] = tableOfContents(md)
    expect(html(md)).toContain(`id="${entry.id}"`)
  })
})

describe('parseImages', () => {
  it('accepts bare paths and { src, alt, caption } objects', () => {
    expect(parseImages(['/a.png', { src: '/b.png', alt: 'B', caption: 'cap' }, 3])).toEqual([
      { src: '/a.png', alt: '' },
      { src: '/b.png', alt: 'B', caption: 'cap' },
    ])
  })
})
