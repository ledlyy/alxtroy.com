import type { Metadata } from 'next'

import { siteConfig } from './config/site'

type BuildMetadataOptions = {
  title?: string
  description?: string
  path?: string
  image?: string
  keywords?: string[]
}

export function buildMetadata(options: BuildMetadataOptions = {}): Metadata {
  const title = options.title ? `${options.title}` : siteConfig.metadata.title
  const description = options.description ?? siteConfig.metadata.description
  const canonicalUrl = new URL(options.path || '/', siteConfig.url).toString()
  const socialImage = options.image || siteConfig.metadata.socialImage

  return {
    title,
    description,
    keywords: options.keywords ?? [...siteConfig.metadata.keywords],
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        siteConfig.locales.map((locale) => [
          locale,
          locale === siteConfig.defaultLocale ? canonicalUrl : `${canonicalUrl}?hl=${locale}`,
        ]),
      ),
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.name,
      images: [socialImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
  }
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function buildOrganizationSchema() {
  const addressParts = siteConfig.brand.headquarters
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: new URL('/logo/mark.svg', siteConfig.url).toString(),
    sameAs: Object.values(siteConfig.socialLinks).filter(Boolean),
    contactPoint: siteConfig.brand.primaryContacts.map((contact) => ({
      '@type': 'ContactPoint',
      contactType: contact.name,
      email: contact.email,
      telephone: contact.phone,
      areaServed: ['US', 'CA', 'MX', 'EU'],
      availableLanguage: ['English', 'Spanish', 'Turkish'],
    })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: addressParts.street,
      addressLocality: addressParts.city,
      addressRegion: addressParts.state,
      postalCode: addressParts.postalCode,
      addressCountry: addressParts.country,
    },
  }
}

export function buildLocalBusinessSchema() {
  const hq = siteConfig.brand.headquarters
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: siteConfig.url,
    image: new URL('/logo/mark.svg', siteConfig.url).toString(),
    telephone: siteConfig.contact.phonePrimary,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: hq.street,
      addressLocality: hq.city,
      addressRegion: hq.state,
      postalCode: hq.postalCode,
      addressCountry: hq.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: hq.geo.lat,
      longitude: hq.geo.lng,
    },
    sameAs: Object.values(siteConfig.socialLinks).filter(Boolean),
  }
}

export function buildServiceSchema(service: { slug: string; name: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: ['United States', 'Canada', 'Latin America', 'Mediterranean'],
    url: new URL(`/services/${service.slug}`, siteConfig.url).toString(),
  }
}

export function buildDestinationPlaceSchema(destination: { slug: string; name: string; region: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: destination.name,
    description: destination.description,
    url: new URL(`/destinations/${destination.slug}`, siteConfig.url).toString(),
    areaServed: destination.region,
    hasMap: siteConfig.contact.mapUrl,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  }
}

export function buildBlogPostingSchema(post: { slug: string; title: string; date: string; excerpt?: string; tags?: string[] }) {
  const url = new URL(`/blog/${post.slug}`, siteConfig.url).toString()
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.excerpt || siteConfig.metadata.description,
    mainEntityOfPage: url,
    url,
    author: {
      '@type': 'Organization',
      name: siteConfig.metadata.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: new URL(siteConfig.metadata.socialImage, siteConfig.url).toString(),
      },
    },
  }
}

export function buildEventSchema(event: { slug: string; title: string; startDate: string; endDate?: string; location?: string; excerpt?: string }) {
  const url = new URL(`/events/${event.slug}`, siteConfig.url).toString()
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    url,
    description: event.excerpt || siteConfig.metadata.description,
    location:
      event.location
        ? {
          '@type': 'Place',
          name: event.location,
          address: {
            '@type': 'PostalAddress',
            streetAddress: event.location,
          },
        }
        : undefined,
    organizer: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

export function buildBreadcrumbSchema(items: Array<{ label: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.url,
    })),
  }
}
