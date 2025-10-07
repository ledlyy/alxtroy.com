import fs from 'fs/promises'
import matter from 'gray-matter'
import { draftMode } from 'next/headers'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { mdxComponents } from '@/components/mdx/MDXComponents'

import { estimateReadingTime, extractHeadings, type Heading } from '@/lib/markdown'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type Post = { slug: string; title: string; date: string; excerpt?: string; tags?: string[]; readingTimeMins?: number }
export type PostDetail = Post & { content: React.ReactElement; headings?: Heading[] }

type PostFrontmatter = {
  slug?: string
  title?: string
  date?: string
  excerpt?: string
  tags?: unknown
  draft?: boolean
}

export async function getPosts(): Promise<Post[]> {
  const entries = await fs.readdir(BLOG_DIR)
  const posts: Post[] = []
  for (const file of entries.filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))) {
    const filePath = path.join(BLOG_DIR, file)
    const raw = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(raw)
    const fm = data as PostFrontmatter
    const slug = fm.slug || file.replace(/\.(md|mdx)$/i, '')
    const isPreview = await safeDraftMode()
    if (fm.draft && !isPreview) continue
    const parsedDate = fm.date ? new Date(fm.date).toISOString() : new Date().toISOString()
    const tags = Array.isArray(fm.tags) ? fm.tags.map((tag) => String(tag)) : []
    posts.push({
      slug,
      title: fm.title || slug,
      date: parsedDate,
      excerpt: fm.excerpt || '',
      tags,
      readingTimeMins: estimateReadingTime(content || ''),
    })
  }
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  return posts
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  const file = await findFileBySlug(slug)
  if (!file) return null
  const raw = await fs.readFile(file, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter
  const mdx = await compileMDX<{ title?: string }>({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: 'anchor' } }],
          [rehypeExternalLinks, { rel: ['nofollow', 'noopener', 'noreferrer'], target: '_blank' }],
        ],
        format: 'mdx',
      },
    },
  })
  return {
    slug,
    title: fm.title || slug,
    date: fm.date ? new Date(fm.date).toISOString() : new Date().toISOString(),
    excerpt: fm.excerpt || '',
    tags: Array.isArray(fm.tags) ? fm.tags.map((tag) => String(tag)) : [],
    readingTimeMins: estimateReadingTime(content || ''),
    headings: extractHeadings(content || ''),
    content: mdx.content,
  }
}

async function findFileBySlug(slug: string) {
  const entries = await fs.readdir(BLOG_DIR)

  // First try to find by filename
  for (const file of entries) {
    if (file.startsWith(slug + '.')) return path.join(BLOG_DIR, file)
  }

  // If not found by filename, check frontmatter slugs
  for (const file of entries.filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))) {
    const filePath = path.join(BLOG_DIR, file)
    const raw = await fs.readFile(filePath, 'utf8')
    const { data } = matter(raw)
    const fm = data as PostFrontmatter
    const fileSlug = fm.slug || file.replace(/\.(md|mdx)$/i, '')
    if (fileSlug === slug) return filePath
  }

  return null
}

async function safeDraftMode(): Promise<boolean> {
  try {
    // draftMode available in server runtime only
    const dm = await draftMode()
    return dm.isEnabled
  } catch {
    return false
  }
}
