import type { Metadata } from 'next'

import { siteConfig } from '@/lib/config/site'
import { buildBreadcrumbSchema, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'References',
  description:
    'Alexander and Troy Tours serves leading brands across multiple industries, delivering receptive services with discretion and care.',
  path: '/references',
})

export default function ReferencesPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { label: 'Home', url: siteConfig.url },
    { label: 'References', url: `${siteConfig.url}/references` },
  ])

  return (
    <div className="space-y-16 pb-20">
      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 shadow-soft">
          <h1 className="text-4xl font-semibold text-foreground">References</h1>
          <p className="mt-4 text-lg text-muted">
            Alexander and Troy Tours’ clientele consists of premier brands across multiple industries. Because we serve primarily under our partners’ brands, we request permission before sharing references publicly.
          </p>
          <p className="mt-4 text-lg text-muted">
            Please explore our gallery to view the scope of programmes we have delivered. We support groups of all sizes, from one-person VIP arrangements to events serving over three hundred guests.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 shadow-soft">
          <h2 className="text-2xl font-semibold text-foreground">How we work</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            We collaborate closely with partners to protect brand standards, ensuring every traveller experiences the quality expected from Alexander and Troy Tours. To request case studies or testimonials, please contact our team directly.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 shadow-soft">
          <h2 className="text-2xl font-semibold text-foreground">Get in touch</h2>
          <p className="mt-4 text-sm text-muted">
            Email <a className="font-medium text-accent underline-offset-4 hover:underline" href="mailto:sales@alxtroy.com">sales@alxtroy.com</a> for tailored information about our programmes and client references.
          </p>
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
