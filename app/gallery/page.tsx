import type { Metadata } from 'next'
import Image from 'next/image'

import { StructuredData } from '@/components/StructuredData'

import { siteConfig } from '@/lib/config/site'
import { buildBreadcrumbSchema, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Gallery',
  description: 'Visual inspiration from Alexander & Troy Tours programmes across the Americas and the Mediterranean.',
  path: '/gallery',
})

const galleryItems = [
  { src: '/assets/destinations/argentina-1.svg', alt: 'Argentina inspiration' },
  { src: '/assets/destinations/argentina-2.svg', alt: 'Argentina inspiration' },
  { src: '/assets/destinations/canada-1.svg', alt: 'Canada inspiration' },
  { src: '/assets/destinations/canada-2.svg', alt: 'Canada inspiration' },
  { src: '/assets/destinations/hawaii-1.svg', alt: 'Hawaii inspiration' },
  { src: '/assets/destinations/mexico-1.svg', alt: 'Mexico inspiration' },
  { src: '/assets/destinations/mexico-2.svg', alt: 'Mexico inspiration' },
  { src: '/assets/destinations/panama-1.svg', alt: 'Panama inspiration' },
  { src: '/assets/destinations/panama-2.svg', alt: 'Panama inspiration' },
  { src: '/assets/destinations/uruguay-1.svg', alt: 'Uruguay inspiration' },
  { src: '/assets/banner-1.jpeg', alt: 'Travel inspiration' },
  { src: '/assets/banner-2.jpeg', alt: 'Travel inspiration' },
]

export default function GalleryPage() {
  const breadcrumb = buildBreadcrumbSchema([
    { label: 'Home', url: siteConfig.url },
    { label: 'Gallery', url: `${siteConfig.url}/gallery` },
  ])

  return (
    <div className="space-y-16 pb-24">
      <section className="container mx-auto px-4">
        <div className="rounded-3xl border bg-surface px-8 py-12 text-center shadow-soft">
          <h1 className="text-4xl font-semibold">Gallery</h1>
          <p className="mt-4 text-lg text-muted">
            A glimpse into the venues, landscapes and curated experiences crafted for our guests.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, index) => (
            <figure key={`${item.src}-${index}`} className="group overflow-hidden rounded-2xl border bg-surface shadow-soft">
              <Image
                src={item.src}
                alt={item.alt}
                width={640}
                height={480}
                className="h-full w-full object-cover transition duration-250 ease-brand group-hover:scale-105"
              />
              <figcaption className="sr-only">{item.alt}</figcaption>
            </figure>
          ))}
        </div>
      </section>
      <StructuredData data={breadcrumb} />
    </div>
  )
}
