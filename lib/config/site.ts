export const siteConfig = {
  name: 'Alexander & Troy Tours',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.alxtroy.com',
  defaultLocale: 'en',
  locales: ['en', 'tr'],
  brand: {
    tagline: 'Receptive services in the US, the Americas',
    description:
      'Alexander and Troy Tours is a professional receptive services company possessing extensive local knowledge, expertise and resources.',
    founded: 1999,
    headquarters: {
      street: '500 Nordhoff Place Suite 6',
      city: 'Englewood',
      state: 'NJ',
      postalCode: '07631',
      country: 'USA',
      geo: { lat: 40.833342, lng: -74.057182 },
    },
    primaryContacts: [
      {
        name: 'Sales Team',
        email: 'sales@alxtroy.com',
        phone: '+1 (201) 490-2212',
      },
      {
        name: 'Operations',
        email: 'operations@alxtroy.com',
        phone: '+1 (201) 636-5082',
      },
    ],
  },
  features: {
    blog: true,
    destinations: true,
    services: true,
    mice: true,
  },
  metadata: {
    title: 'Alexander & Troy Tours',
    description:
      'Alexander and Troy Tours is a professional receptive services company specialising in the Americas, providing events, logistics and tailored travel.',
    keywords: [
      'Alexander and Troy Tours',
      'Receptive services USA',
      'MICE partner',
      'Event logistics Americas',
      'Tailor-made travel USA',
      'Destination management company',
    ],
    author: 'Alexander & Troy Tours',
    socialImage: '/assets/og-default.png',
  },
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'MICE', href: '/mice' },
    { label: 'Destinations', href: '/destinations' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'References', href: '/references' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  routes: {
    home: {
      href: '/',
      breadcrumbs: { en: ['Home'], tr: ['Ana Sayfa'] },
      aliases: { tr: '/tr' },
    },
    about: {
      href: '/about',
      breadcrumbs: { en: ['Home', 'About'], tr: ['Ana Sayfa', 'Hakkımızda'] },
      aliases: { tr: '/tr/hakkimizda' },
    },
    services: {
      href: '/services',
      breadcrumbs: { en: ['Home', 'Services'], tr: ['Ana Sayfa', 'Hizmetler'] },
      aliases: { tr: '/tr/hizmetler' },
    },
    mice: {
      href: '/mice',
      breadcrumbs: { en: ['Home', 'MICE'], tr: ['Ana Sayfa', 'MICE'] },
      aliases: { tr: '/tr/mice' },
    },
    destinations: {
      href: '/destinations',
      breadcrumbs: {
        en: ['Home', 'Destinations'],
        tr: ['Ana Sayfa', 'Destinasyonlar'],
      },
      aliases: { tr: '/tr/destinasyonlar' },
    },
    gallery: {
      href: '/gallery',
      breadcrumbs: { en: ['Home', 'Gallery'], tr: ['Ana Sayfa', 'Galeri'] },
      aliases: { tr: '/tr/galeri' },
    },
    blog: {
      href: '/blog',
      breadcrumbs: { en: ['Home', 'Blog'], tr: ['Ana Sayfa', 'Blog'] },
      aliases: { tr: '/tr/blog' },
    },
    contact: {
      href: '/contact',
      breadcrumbs: { en: ['Home', 'Contact'], tr: ['Ana Sayfa', 'İletişim'] },
      aliases: { tr: '/tr/iletisim' },
    },
  },
  contact: {
    email: 'sales@alxtroy.com',
    phonePrimary: '+1 (201) 490-2212',
    phoneSecondary: '+1 (201) 636-5082',
    fax: '+1 (201) 622-1429',
    address: '500 Nordhoff Place Suite 6, Englewood, NJ 07631 USA',
    mapUrl: 'https://maps.google.com/?q=500+Nordhoff+Place+Suite+6,+Englewood,+NJ+07631',
  },
  socialLinks: {
    google: 'https://maps.google.com/?q=Alexander+%26+Troy+Tours+500+Nordhoff+Place+Suite+6+Englewood+NJ',
    facebook: 'https://www.facebook.com/',
    twitter: 'https://twitter.com/',
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/company/',
    pinterest: 'https://tr.pinterest.com/',
    vimeo: 'https://vimeo.com/',
  },
  analytics: {
    provider: (process.env.NEXT_PUBLIC_GA4_ID ? 'ga' : 'none') as 'ga' | 'none' | 'plausible',
    gaTrackingId: process.env.NEXT_PUBLIC_GA4_ID || '',
    plausibleDataDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
    cmp: (process.env.NEXT_PUBLIC_CMP || 'custom') as 'cookiebot' | 'usercentrics' | 'osano' | 'klaro' | 'custom',
  },
} as const

export type SiteConfig = typeof siteConfig
