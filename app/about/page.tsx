import type { Metadata } from 'next'

import { siteConfig } from '@/lib/config/site'
import { buildBreadcrumbSchema, buildMetadata } from '@/lib/seo'

import { companyStory, companyValues, globalPresence } from '@/content/company'

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description: 'Alexander & Troy Tours is the trusted DMC partner for bespoke travel, incentives and events across the Americas.',
  path: '/about',
})

export default function AboutPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { label: 'Home', url: siteConfig.url },
    { label: 'About', url: `${siteConfig.url}/about` },
  ])

  return (
    <div className="space-y-20 pb-24">
      <section className="container mx-auto px-4">
        <div className="grid items-start gap-10 rounded-3xl border bg-surface px-8 py-12 shadow-soft md:grid-cols-2">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent/80">Our story</p>
            <h1 className="text-4xl font-semibold leading-tight">{companyStory.heading}</h1>
            <p className="text-lg text-muted">{companyStory.introduction}</p>
          </div>
          <div className="space-y-4 text-base text-muted">
            {companyStory.paragraphs.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold">What we stand for</h2>
          <p className="mt-4 text-lg text-muted">
            Our organisational values keep every programme grounded in service, integrity and creativity.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {companyValues.map((value) => (
            <article key={value.title} className="shadow-soft/40 h-full rounded-2xl border bg-surface p-6">
              <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 shadow-soft">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold">Global presence</h2>
            <p className="mt-4 text-lg text-muted">
              We scale alongside your ambitions with specialists positioned where you need them most.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {globalPresence.regions.map((region) => (
              <article key={region.title} className="shadow-soft/30 rounded-2xl border border-border/60 bg-background/80 p-6">
                <h3 className="text-lg font-semibold">{region.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{region.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-accent px-8 py-12 text-[rgb(var(--accent-fg))] shadow-soft">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl font-semibold">We represent your goals in every market.</h2>
              <p className="text-base text-white/80">
                Every partner is assigned a dedicated project lead and multilingual operations team to ensure speed, accuracy and transparency.
              </p>
            </div>
            <a
              href="mailto:sales@alxtroy.com"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-accent transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Email our leadership team
            </a>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </div>
  )
}
