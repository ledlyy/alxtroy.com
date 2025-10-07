import type { Metadata } from 'next'

import { siteConfig } from '@/lib/config/site'
import { buildBreadcrumbSchema, buildMetadata } from '@/lib/seo'

import { services } from '@/content/services'

export const metadata: Metadata = buildMetadata({
  title: 'Services',
  description:
    'Alexander and Troy Tours delivers receptive services across the Americas, including event management, group logistics and bespoke travel support.',
  path: '/services',
})

export default function ServicesPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { label: 'Home', url: siteConfig.url },
    { label: 'Services', url: `${siteConfig.url}/services` },
  ])

  return (
    <div className="space-y-12 pb-20">
      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent/80">Services</p>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">Alexander and Troy Tours Receptive Services</h1>
          <p className="mt-6 text-base text-muted">
            As the premiere receptive service company in the USA, Alexander and Troy Tours provides tailor-made solutions across transportation, accommodation, meetings, incentives and travel logistics. The following overview captures the services available to partners and clients.
          </p>
        </div>
      </section>

      <section className="container mx-auto space-y-10 px-4">
        {services.map((service) => (
          <article key={service.slug} className="rounded-3xl border bg-surface px-8 py-12 shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground">{service.title}</h2>
            <p className="mt-4 text-base text-muted">{service.excerpt}</p>
            <ul className="mt-6 space-y-2 text-sm text-muted">
              {service.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
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
