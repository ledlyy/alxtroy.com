import { NextResponse } from 'next/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.alxtroy.com'

export function GET() {
  const content = `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', siteUrl).toString()}\n`
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
