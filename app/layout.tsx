import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/styles/theme.css'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'

import { AnalyticsBridge } from '@/components/AnalyticsBridge'
import { CookieConsent } from '@/components/CookieConsent'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ThemeColorMeta } from '@/components/ThemeColorMeta'

import { siteConfig } from '@/lib/config/site'
import { getLocaleFromString } from '@/lib/i18n/dictionaries'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { buildOrganizationSchema, buildLocalBusinessSchema } from '@/lib/seo'

import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.metadata.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.metadata.description,
  keywords: siteConfig.metadata.keywords as unknown as string[],
  authors: [{ name: siteConfig.metadata.author }],
  alternates: {
    canonical: siteConfig.url,
    languages: Object.fromEntries(
      siteConfig.locales.map((l) => [l, `${siteConfig.url}${l === siteConfig.defaultLocale ? '' : `/${l}`}`])
    ),
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    images: [{ url: siteConfig.metadata.socialImage }],
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.metadata.title,
    description: siteConfig.metadata.description,
    images: [siteConfig.metadata.socialImage],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: ['/favicon-16x16.png', '/favicon-32x32.png'],
    apple: '/apple-touch-icon.png',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const cookieLocale = getLocaleFromString(cookieStore.get('hl')?.value)
  const dict = getDictionary(cookieLocale)
  return (
    <html lang={cookieLocale || siteConfig.defaultLocale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="speculationrules" href="/speculation-rules.json" />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        <Providers>
          <AnalyticsBridge />
          <ThemeColorMeta />
          <a
            href="#main-content"
            className="sr-only rounded-full bg-foreground px-4 py-2 text-background shadow-soft focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
          >
            {dict['common.skip_to_content']}
          </a>
          <Header />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer />
          {/* Organization schema for global trust */}
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([buildOrganizationSchema(), buildLocalBusinessSchema()]),
            }}
          />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}
