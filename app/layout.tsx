import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { cookies, headers } from 'next/headers'
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { AnalyticsBridge } from '@/components/AnalyticsBridge'
import { CookieConsent } from '@/components/CookieConsent'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { StructuredData } from '@/components/StructuredData'
import { ThemeColorMeta } from '@/components/ThemeColorMeta'
import { TrustedTypesPolicy } from '@/components/TrustedTypesPolicy'

import { siteConfig } from '@/lib/config/site'
import { getLocaleFromString } from '@/lib/i18n/dictionaries'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { buildOrganizationSchema, buildLocalBusinessSchema } from '@/lib/seo'

import { Providers } from './providers'

const criticalCss = readFileSync(path.join(process.cwd(), 'app/_critical.css'), 'utf8')
const loadNonCriticalCssScript = `
  (function loadStyles(){
    if (window.__alxtroyStylesLoaded) return;
    window.__alxtroyStylesLoaded = true;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/styles/app.css';
    link.media = 'all';
    document.head.appendChild(link);
  }());
`

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans-base' })
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-display',
})

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
  const headerList = await headers()
  const nonce = headerList.get('x-nonce') ?? undefined
  const cookieLocale = getLocaleFromString(cookieStore.get('hl')?.value)
  const dict = getDictionary(cookieLocale)
  return (
    <html lang={cookieLocale || siteConfig.defaultLocale} suppressHydrationWarning data-csp-nonce={nonce}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="speculationrules" href="/speculation-rules.json" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="/styles/app.css" />
        <style nonce={nonce ?? undefined} dangerouslySetInnerHTML={{ __html: criticalCss }} />
        <script nonce={nonce ?? undefined} dangerouslySetInnerHTML={{ __html: loadNonCriticalCssScript }} />
        <noscript>
          <link rel="stylesheet" href="/styles/app.css" />
        </noscript>
      </head>
      <body className={`bg-background font-sans text-foreground ${inter.variable} ${plusJakarta.variable}`}>
        <Providers>
          <AnalyticsBridge />
          <TrustedTypesPolicy />
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
          <StructuredData data={[buildOrganizationSchema(), buildLocalBusinessSchema()]} />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  )
}
