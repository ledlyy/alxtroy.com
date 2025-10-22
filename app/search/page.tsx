import type { Metadata } from 'next'
import Link from 'next/link'

import { StructuredData } from '@/components/StructuredData'

import { siteConfig } from '@/lib/config/site'
import { getPosts } from '@/lib/data/posts'
import { buildBreadcrumbSchema, buildMetadata } from '@/lib/seo'

import { destinations } from '@/content/destinations'
import { services } from '@/content/services'

export const metadata: Metadata = buildMetadata({
  title: 'Search',
  description: 'Search Alexander & Troy Tours for services, destinations and insights.',
  path: '/search',
})

type SearchParams = Record<string, string | string[] | undefined>

type SearchItem = {
  type: 'post' | 'service' | 'destination'
  title: string
  url: string
  excerpt?: string
  tags?: string[]
}

function normalise(value: string | string[] | undefined): string {
  if (!value) return ''
  return Array.isArray(value) ? value[0] || '' : value
}

function score(query: string, item: SearchItem): number {
  const q = query.toLowerCase()
  let points = 0
  if (item.title.toLowerCase().includes(q)) points += 3
  if (item.excerpt && item.excerpt.toLowerCase().includes(q)) points += 2
  if (item.tags?.some((tag) => tag.toLowerCase().includes(q))) points += 1
  return points
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams
  const query = normalise(params.q).trim()
  const q = query.toLowerCase()

  const posts = await getPosts()
  const breadcrumb = buildBreadcrumbSchema([
    { label: 'Home', url: siteConfig.url },
    { label: 'Search', url: `${siteConfig.url}/search` },
  ])
  const items: SearchItem[] = [
    ...posts.map((post) => ({
      type: 'post' as const,
      title: post.title,
      url: `/blog/${post.slug}`,
      excerpt: post.excerpt,
      tags: post.tags || [],
    })),
    ...services.map((service) => ({
      type: 'service' as const,
      title: service.title,
      url: service.href,
      excerpt: service.excerpt,
      tags: service.details,
    })),
    ...destinations.map((destination) => ({
      type: 'destination' as const,
      title: destination.name,
      url: `/destinations/${destination.slug}`,
      excerpt: destination.summary,
      tags: [destination.region, ...destination.details],
    })),
  ]

  const results = q
    ? items
      .map((item) => ({ item, score: score(q, item) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item)
    : []

  return (
    <div className="space-y-10 pb-24">
      <section className="border-b bg-surface">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-semibold">Search</h1>
          <p className="mt-2 text-sm text-muted">Find services, destinations and articles.</p>
          <form action="/search" method="get" className="mt-6 flex max-w-xl gap-3">
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="What can we help you find?"
              className="focus-visible:ring-ring flex-1 rounded-full border bg-background px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2"
              aria-label="Search query"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-[rgb(var(--accent-fg))] shadow-soft"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="container mx-auto px-4">
        {q && (
          <p className="text-sm text-muted">
            Showing {results.length} result{results.length === 1 ? '' : 's'} for “{query}”.
          </p>
        )}
        <ul className="mt-6 space-y-4">
          {results.map((result) => (
            <li key={`${result.type}-${result.url}`} className="shadow-soft/40 rounded-2xl border bg-surface/80 p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-700">{result.type}</span>
              <Link href={result.url} className="mt-2 block text-lg font-semibold text-foreground">
                {result.title}
              </Link>
              {result.excerpt ? <p className="mt-2 text-sm leading-relaxed text-muted">{result.excerpt}</p> : null}
            </li>
          ))}
          {q && results.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-muted/60 p-6 text-sm text-muted">
              No matches yet. Try searching for “MICE”, “Panama” or “tailor-made”.
            </li>
          ) : null}
        </ul>
      </section>
      <StructuredData data={breadcrumb} />
    </div>
  )
}
