import { siteConfig } from '@/lib/config/site'
import { getPosts } from '@/lib/data/posts'

export const revalidate = 3600

export async function GET() {
  const posts = await getPosts()
  const site = siteConfig.url.replace(/\/$/, '')
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${site}</link>
    <description>${escapeXml(siteConfig.metadata.description)}</description>
    ${posts
      .map(
        (p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${site}/blog/${encodeURIComponent(p.slug)}</link>
      <guid>${site}/blog/${encodeURIComponent(p.slug)}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt || '')}</description>
    </item>`
      )
      .join('')}
  </channel>
</rss>`
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  })
}

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

