import type { Metadata } from 'next'
import Link from 'next/link'

import { buildMetadata, buildWebsiteSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Home',
})

export default function HomePage() {
  const websiteSchema = buildWebsiteSchema()

  const reasons = [
    'We represent you, your goals and objectives in the markets we serve.',
    'Benefit from our knowledge of local markets, products, service quality and reliability.',
    'We negotiate on your behalf, always keeping your best interest and budget in mind.',
    'Leverage our ongoing vendor relationships and purchasing power for cost-effective quality.',
    'We are your single point of contact with access to exceptional venues, caterers, transportation and event services.',
  ]

  return (
    <div className="space-y-16 pb-20">
      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent/80">Alexander and Troy Tours</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-foreground">Receptive services in the US, the Americas</h1>
          <p className="mt-6 text-lg text-muted">
            Alexander and Troy Tours is a professional receptive services company possessing extensive local knowledge, expertise and resources, specialising in the design and implementation of events, activities, tours, transportation and programme logistics.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 shadow-soft">
          <h2 className="text-3xl font-semibold text-foreground">Why work with us?</h2>
          <ul className="mt-6 space-y-3 text-base text-muted">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3">
                <span aria-hidden className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base text-muted">
            We are your one point of contact in the market. With knowledge of the finest local venues, caterers, transportation and other event services—and with access to unique and exclusive spaces—we deliver creative ideas for special events, team building and the most challenging programmes.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 shadow-soft">
          <h2 className="text-2xl font-semibold text-foreground">Connect with us</h2>
          <p className="mt-3 text-sm text-muted">Follow Alexander & Troy Tours across our social channels.</p>
          <ul className="mt-5 grid gap-3 text-sm text-accent sm:grid-cols-2 md:grid-cols-3">
            <li>
              <a href="https://www.facebook.com/" className="underline decoration-accent/40 hover:decoration-accent" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" className="underline decoration-accent/40 hover:decoration-accent" target="_blank" rel="noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" className="underline decoration-accent/40 hover:decoration-accent" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/" className="underline decoration-accent/40 hover:decoration-accent" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://tr.pinterest.com/" className="underline decoration-accent/40 hover:decoration-accent" target="_blank" rel="noreferrer">
                Pinterest
              </a>
            </li>
            <li>
              <a href="https://vimeo.com/" className="underline decoration-accent/40 hover:decoration-accent" target="_blank" rel="noreferrer">
                Vimeo
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/services"
              className="focus-visible:ring-ring inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2"
            >
              Explore services
            </Link>
            <Link
              href="/contact"
              className="focus-visible:ring-ring inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[rgb(var(--accent-fg))] shadow-soft hover:brightness-95 focus-visible:outline-none focus-visible:ring-2"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </div>
  )
}
