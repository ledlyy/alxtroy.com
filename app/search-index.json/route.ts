import { NextResponse } from 'next/server'

import { getPosts } from '@/lib/data/posts'

import { destinations } from '@/content/destinations'
import { services } from '@/content/services'

export const revalidate = 3600

export async function GET() {
  const posts = await getPosts()
  const items = [
    ...posts.map((post) => ({
      type: 'post' as const,
      title: post.title,
      slug: post.slug,
      url: `/blog/${post.slug}`,
      date: post.date,
      excerpt: post.excerpt,
      tags: post.tags || [],
    })),
    ...services.map((service) => ({
      type: 'service' as const,
      title: service.title,
      slug: service.slug,
      url: `/services/${service.slug}`,
      date: undefined,
      excerpt: service.excerpt,
      tags: [],
    })),
    ...destinations.map((destination) => ({
      type: 'destination' as const,
      title: destination.name,
      slug: destination.slug,
      url: `/destinations/${destination.slug}`,
      date: undefined,
      excerpt: destination.summary,
      tags: [destination.region],
    })),
  ]

  return NextResponse.json({ items }, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  })
}
