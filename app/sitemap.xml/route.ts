import { NextResponse } from 'next/server'

import { getPosts } from '@/lib/data/posts'

import { destinations } from '@/content/destinations'
import { services } from '@/content/services'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.alxtroy.com'

function buildUrl(path: string): string {
  return new URL(path, siteUrl).toString()
}

export async function GET() {
  const now = new Date().toISOString()
  const posts = await getPosts()

  const staticEntries = [
    { loc: buildUrl('/'), lastmod: now, priority: '1.0' },
    { loc: buildUrl('/about'), lastmod: now },
    { loc: buildUrl('/services'), lastmod: now },
    { loc: buildUrl('/destinations'), lastmod: now },
    { loc: buildUrl('/gallery'), lastmod: now },
    { loc: buildUrl('/contact'), lastmod: now },
    { loc: buildUrl('/blog'), lastmod: now },
    { loc: buildUrl('/search'), lastmod: now },
  ]

  const serviceEntries = services.map((service) => ({
    loc: buildUrl(`/services/${service.slug}`),
    lastmod: now,
  }))

  const destinationEntries = destinations.map((destination) => ({
    loc: buildUrl(`/destinations/${destination.slug}`),
    lastmod: now,
  }))

  const blogEntries = posts.map((post) => ({
    loc: buildUrl(`/blog/${post.slug}`),
    lastmod: new Date(post.date).toISOString(),
  }))

  const entries = [...staticEntries, ...serviceEntries, ...destinationEntries, ...blogEntries]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries
    .map(
      (entry) => `  <url>\n    <loc>${entry.loc}</loc>\n    <lastmod>${entry.lastmod}</lastmod>\n  </url>`
    )
    .join('\n')}\n</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
