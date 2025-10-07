/** @type {import('next-sitemap').IConfig} */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const locales = ['en', 'tr', 'es']
const defaultLocale = 'en'

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  alternateRefs: locales.map((l) => ({
    href: `${SITE_URL}${l === defaultLocale ? '' : `/${l}`}`,
    hreflang: l,
  })),
}
