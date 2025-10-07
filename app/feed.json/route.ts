import { siteConfig } from '@/lib/config/site'
import { getPosts } from '@/lib/data/posts'

export const revalidate = 3600

export async function GET() {
  const posts = await getPosts()
  const site = siteConfig.url.replace(/\/$/, '')
  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: siteConfig.name,
    home_page_url: site,
    feed_url: `${site}/feed.json`,
    description: siteConfig.metadata.description,
    items: posts.map((p) => ({
      id: `${site}/blog/${p.slug}`,
      url: `${site}/blog/${p.slug}`,
      title: p.title,
      content_text: p.excerpt || '',
      date_published: new Date(p.date).toISOString(),
      tags: p.tags || [],
    })),
  }
  return new Response(JSON.stringify(feed, null, 2), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  })
}

