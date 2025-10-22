import type { Metadata } from 'next'
import Link from 'next/link'

import { StructuredData } from '@/components/StructuredData'

import { siteConfig } from '@/lib/config/site'
import { getPosts } from '@/lib/data/posts'
import { buildBreadcrumbSchema, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Insights',
  description: 'Latest perspectives from Alexander & Troy Tours on destination management, incentives and bespoke travel.',
  path: '/blog',
})

export default async function BlogIndexPage() {
  const posts = await getPosts()
  const breadcrumb = buildBreadcrumbSchema([
    { label: 'Home', url: siteConfig.url },
    { label: 'Insights', url: `${siteConfig.url}/blog` },
  ])

  return (
    <div className="space-y-16 pb-24">
      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 text-center shadow-soft">
          <h1 className="text-4xl font-semibold">Insights</h1>
          <p className="mt-4 text-lg text-muted">
            Practical guidance for travel advisors, meeting planners and corporate clients working across our destinations.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <ul className="grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug} className="shadow-soft/40 rounded-2xl border bg-surface/80 p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-700">Article</span>
              <Link href={`/blog/${post.slug}`} className="mt-3 block text-2xl font-semibold text-foreground">
                {post.title}
              </Link>
              <p className="mt-2 text-sm text-muted">
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              {post.excerpt ? <p className="mt-4 text-sm leading-relaxed text-muted">{post.excerpt}</p> : null}
              <Link
                href={`/blog/${post.slug}`}
                className="focus-visible:ring-ring mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2"
              >
                Read article
                <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <StructuredData data={breadcrumb} />
    </div>
  )
}
