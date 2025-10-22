import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { cookies, headers } from 'next/headers'

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

const criticalCss = `:root {
  color-scheme: light;
  --font-sans-base: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-display: 'Plus Jakarta Sans', var(--font-sans-base);
  --bg: 246 248 252;
  --fg: 15 23 42;
  --muted: 100 116 139;
  --accent: 163 133 85;
  --accent-700: 124 90 47;
  --accent-600: 143 106 58;
  --accent-500: 163 133 85;
  --accent-400: 188 159 109;
  --accent-fg: 255 255 255;
  --border: 214 221 235;
}

* {
  box-sizing: border-box;
}

html,
body {
  padding: 0;
  margin: 0;
}

body {
  font-family: var(--font-display, var(--font-sans-base));
  background-color: rgb(var(--bg));
  color: rgb(var(--fg));
}

a {
  color: rgb(var(--accent));
  text-decoration: none;
}

.critical-header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(24px);
  background: rgba(246, 248, 252, 0.92);
  border-bottom: 1px solid rgba(214, 221, 235, 0.4);
}

.critical-header-inner {
  margin: 0 auto;
  max-width: 1200px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 1.5rem;
}

.critical-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
}

.critical-hero {
  margin: 0 auto;
  max-width: 1200px;
  padding: 6rem 1.5rem 0;
}

.critical-hero-card {
  position: relative;
  overflow: hidden;
  border-radius: 2.5rem;
  border: 1px solid rgba(var(--border), 0.6);
  background: rgba(255, 255, 255, 0.85);
  padding: 3rem 2rem;
}

.critical-hero-content {
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.critical-hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  background: rgba(163, 133, 85, 0.14);
  color: rgb(var(--accent));
}

.critical-hero-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 600;
  line-height: 1.1;
  margin: 0;
}

.critical-hero-subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  color: rgb(var(--muted));
  margin: 0;
}

.critical-hero-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.critical-hero-actions__primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 999px;
  padding: 0.9rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  background: linear-gradient(135deg, rgba(163, 133, 85, 1) 0%, rgba(221, 184, 145, 1) 100%);
  color: rgb(var(--accent-fg));
  box-shadow: 0 16px 32px rgba(163, 133, 85, 0.24);
}

.critical-hero-actions__secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  border-radius: 999px;
  padding: 0.9rem 1.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  border: 2px solid rgba(214, 221, 235, 1);
  color: rgb(var(--fg));
  background: rgba(255, 255, 255, 0.9);
}

@media (min-width: 768px) {
  .critical-hero-actions {
    flex-direction: row;
    align-items: center;
  }
}`
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
