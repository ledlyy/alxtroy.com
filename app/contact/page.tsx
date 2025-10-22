import type { Metadata } from 'next'

import { ContactForm } from '@/components/ContactForm'
import { StructuredData } from '@/components/StructuredData'

import { siteConfig } from '@/lib/config/site'
import { buildBreadcrumbSchema, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description: 'Contact Alexander & Troy Tours for bespoke travel, incentives and MICE programmes across the Americas.',
  path: '/contact',
})

const contacts = [
  {
    name: 'Head Office',
    phone: siteConfig.contact.phonePrimary,
    email: siteConfig.contact.email,
  },
  {
    name: 'Operations Team',
    phone: siteConfig.contact.phoneSecondary,
    email: 'operations@alxtroy.com',
  },
]

export default function ContactPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { label: 'Home', url: siteConfig.url },
    { label: 'Contact', url: `${siteConfig.url}/contact` },
  ])

  return (
    <div className="space-y-16 pb-24">
      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 text-center shadow-soft">
          <h1 className="text-4xl font-semibold">Let’s plan your next programme</h1>
          <p className="mt-4 text-lg text-muted">
            Share your project details and our specialists will respond with tailored concepts, budgets and timelines.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-3xl border bg-surface px-8 py-10 shadow-soft">
            <h2 className="text-2xl font-semibold">Message us</h2>
            <p className="mt-2 text-sm text-muted">
              All enquiries are routed to our sales desk and answered within one business day. For urgent matters, contact the operations hotline listed below.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <div className="space-y-6 rounded-3xl border bg-surface px-8 py-10 shadow-soft">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold">Contact details</h2>
              <p className="text-sm text-muted">Alexander & Troy LLC<br />{siteConfig.contact.address}</p>
              <a
                href={siteConfig.contact.mapUrl}
                className="focus-visible:ring-ring inline-flex items-center gap-2 text-sm font-semibold text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2"
              >
                View on Google Maps
              </a>
            </section>
            <section className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.name} className="shadow-soft/30 rounded-2xl border bg-background/80 p-6">
                  <h3 className="text-base font-semibold text-foreground">{contact.name}</h3>
                  <p className="mt-2 text-sm text-muted">
                    <a href={`tel:${contact.phone}`} className="font-medium text-foreground underline-offset-4 hover:underline">{contact.phone}</a>
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    <a href={`mailto:${contact.email}`} className="font-medium text-accent underline-offset-4 hover:underline">{contact.email}</a>
                  </p>
                </div>
              ))}
            </section>
            <section>
              <h3 className="text-base font-semibold text-foreground">Office hours</h3>
              <p className="mt-2 text-sm text-muted">
                Monday to Friday · 09:00 – 18:00 (EST)<br />
                24/7 guest hotline during live programmes.
              </p>
            </section>
            <section>
              <p className="text-sm text-muted">
                <strong className="font-semibold text-foreground">Note:</strong> We would be glad to assist you and respond in the shortest possible time with the alternatives that meet your needs.
              </p>
            </section>
          </div>
        </div>
      </section>
      <StructuredData data={breadcrumb} />
    </div>
  )
}
