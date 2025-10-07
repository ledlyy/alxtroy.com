import type { Metadata } from 'next'
import Link from 'next/link'

import { siteConfig } from '@/lib/config/site'
import { buildBreadcrumbSchema, buildMetadata } from '@/lib/seo'

import { destinations } from '@/content/destinations'

export const metadata: Metadata = buildMetadata({
  title: 'Destinations',
  description: 'Discover the destinations supported by Alexander and Troy Tours across the United States and the Americas.',
  path: '/destinations',
})

export default function DestinationsPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { label: 'Home', url: siteConfig.url },
    { label: 'Destinations', url: `${siteConfig.url}/destinations` },
  ])

  return (
    <div className="space-y-12 pb-20">
      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent/80">Destinations</p>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">Every journey begins with local knowledge</h1>
          <p className="mt-6 text-base text-muted">
            Alexander and Troy Tours operates receptive services across the Americas, supporting programmes from Latin America to North America and island destinations.
          </p>
        </div>
      </section>

      <section className="container mx-auto space-y-6 px-4">
        {destinations.map((destination) => (
          <article key={destination.slug} className="rounded-3xl border bg-surface px-8 py-10 shadow-soft">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/80">{destination.region}</p>
                <h2 className="mt-3 text-3xl font-semibold text-foreground">{destination.name}</h2>
              </div>
              <Link
                href={`/destinations/${destination.slug}`}
                className="focus-visible:ring-ring inline-flex items-center gap-2 text-sm font-semibold text-accent transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2"
              >
                View details
                <span aria-hidden>→</span>
              </Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{destination.summary}</p>
          </article>
        ))}
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </div>
  )
}
