import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { StructuredData } from '@/components/StructuredData'

import { siteConfig } from '@/lib/config/site'
import { buildBreadcrumbSchema, buildDestinationPlaceSchema, buildMetadata } from '@/lib/seo'

import { destinations } from '@/content/destinations'

const destinationMap = new Map(destinations.map((destination) => [destination.slug, destination]))

export const dynamicParams = false

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const destination = destinationMap.get(slug)
  if (!destination) {
    return buildMetadata({ title: `Destination | ${siteConfig.name}`, path: '/destinations' })
  }
  return buildMetadata({
    title: destination.name,
    description: destination.summary,
    path: `/destinations/${destination.slug}`,
  })
}

export default async function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const destination = destinationMap.get(slug)
  if (!destination) notFound()

  const breadcrumb = buildBreadcrumbSchema([
    { label: 'Home', url: siteConfig.url },
    { label: 'Destinations', url: `${siteConfig.url}/destinations` },
    { label: destination.name, url: `${siteConfig.url}/destinations/${destination.slug}` },
  ])

  return (
    <div className="space-y-12 pb-20">
      <section className="border-b bg-surface">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-700">{destination.region}</span>
            <h1 className="text-4xl font-semibold text-foreground">{destination.name}</h1>
            <p className="text-base text-muted">{destination.summary}</p>
            <Link
              href="/contact"
              className="focus-visible:ring-ring inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[rgb(var(--accent-fg))] shadow-soft transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2"
            >
              Plan a programme
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="space-y-4 rounded-3xl border bg-surface px-8 py-10 shadow-soft">
          <h2 className="text-2xl font-semibold text-foreground">Highlights</h2>
          <ul className="space-y-3 text-sm leading-relaxed text-muted">
            {destination.details.map((detail) => (
              <li key={detail} className="flex items-start gap-2">
                <span aria-hidden className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Link
        href="/destinations"
        className="focus-visible:ring-ring mx-auto block w-fit rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2"
      >
        Back to destinations
      </Link>

      <StructuredData
        data={[
          breadcrumb,
          buildDestinationPlaceSchema({
            slug: destination.slug,
            name: destination.name,
            region: destination.region,
            description: destination.summary,
          }),
        ]}
      />
    </div>
  )
}
