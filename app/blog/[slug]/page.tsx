import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StructuredData } from '@/components/StructuredData'

import { siteConfig } from '@/lib/config/site'
import { getPost, getPosts } from '@/lib/data/posts'
import { buildBlogPostingSchema, buildBreadcrumbSchema, buildMetadata } from '@/lib/seo'

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) {
    return buildMetadata({ title: `Insights | ${siteConfig.name}`, path: '/blog' })
  }
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const breadcrumb = buildBreadcrumbSchema([
    { label: 'Home', url: siteConfig.url },
    { label: 'Insights', url: `${siteConfig.url}/blog` },
    { label: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
  ])

  return (
    <article className="prose prose-neutral mx-auto max-w-3xl px-4 py-16 dark:prose-invert">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-700">Insights</p>
      <h1 className="text-4xl font-semibold leading-tight text-foreground">{post.title}</h1>
      <p className="text-sm text-muted">
        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      <div className="mt-6">{post.content}</div>
      <StructuredData data={[breadcrumb, buildBlogPostingSchema(post)]} />
    </article>
  )
}
