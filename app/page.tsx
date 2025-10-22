import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { StructuredData } from '@/components/StructuredData'

import { buildMetadata, buildWebsiteSchema } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Home',
})

export default function HomePage() {
  const websiteSchema = buildWebsiteSchema()

  const heroMetrics = [
    { label: 'Destinations Curated', value: '40+' },
    { label: 'Trusted Partners', value: '120+' },
    { label: 'Client Satisfaction', value: '98%' },
  ]

  const pillars = [
    {
      title: 'Representation & Strategy',
      description: 'We align itineraries with your goals and deliver measurable outcomes in every market we serve.',
      icon: 'M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      title: 'On-Ground Intelligence',
      description: 'Access vetted local partners, product insights, and quality benchmarks maintained by our specialists.',
      icon: 'M3 7l9-4 9 4-9 4-9-4zm0 6l9 4 9-4',
    },
    {
      title: 'Negotiation Power',
      description: 'Use our purchasing strength for premium experiences that stay on budget and elevate every touchpoint.',
      icon: 'M12 8c-1.657 0-3 .843-3 1.883 0 1.041 1.343 1.884 3 1.884s3 .843 3 1.883c0 1.041-1.343 1.884-3 1.884m0-7.534V6m0 10v-1.316m8-4.184c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z',
    },
    {
      title: 'Single Contact Delivery',
      description: 'One point of contact orchestrates venues, logistics, and event services with zero friction for your teams.',
      icon: 'M17 20h5v-2a4 4 0 00-5.33-3.81M9 20H4v-2a4 4 0 015.33-3.81M12 12a4 4 0 100-8 4 4 0 000 8zm0 0v8',
    },
  ]

  const socialChannels = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/',
      description: 'Corporate updates and partnership opportunities.',
      icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2h-1a2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/',
      description: 'Visual inspiration direct from our journeys.',
      icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01',
    },
    {
      name: 'Pinterest',
      href: 'https://tr.pinterest.com/',
      description: 'Curated concepts for future experiences.',
      icon: 'M8 10.5a2.5 2.5 0 104.5-1.5h-2a.5.5 0 01-.5-.5V7a.5.5 0 01.5-.5h2a2.5 2.5 0 104.5-1.5M8 19a1 1 0 001 1h6a1 1 0 001-1',
    },
    {
      name: 'Newsletter',
      href: '/contact',
      description: 'Monthly trend reports and destination intel.',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    },
  ]

  return (
    <div className="space-y-24 pb-28 pt-8 lg:space-y-28">
      {/* Hero */}
      <section className="critical-hero container mx-auto px-4">
        <div className="critical-hero-card relative overflow-hidden rounded-[2.5rem] border border-border/50 bg-surface/80 px-6 py-12 shadow-xl sm:px-10 lg:px-16 lg:py-20">
          <div className="absolute inset-x-0 -top-40 h-80 bg-gradient-to-b from-[rgba(var(--accent),0.12)] to-transparent blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
            <div className="critical-hero-content space-y-8">
              <span className="critical-hero-pill inline-flex items-center gap-2 rounded-full border border-transparent bg-[rgba(var(--accent),0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[rgb(var(--accent))]">
                Receptive Services 2025
              </span>
              <h1 className="critical-hero-title text-balance text-4xl font-semibold text-foreground sm:text-5xl lg:text-6xl">
                Intelligent travel design, executed by Alexander &amp; Troy experts.
              </h1>
              <p className="critical-hero-subtitle max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
                We blend AI-supported planning with human insight to craft destination management programmes across the Americas. From incentives to FIT, every detail is prototyped, validated, and delivered by a dedicated producer.
              </p>
              <div className="critical-hero-actions flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/services" className="critical-hero-actions__primary btn-primary group">
                  <span>Plan Your Programme</span>
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/contact" className="critical-hero-actions__secondary btn-secondary">
                  Talk to a Producer
                </Link>
              </div>
              <dl className="grid gap-4 sm:grid-cols-3">
                {heroMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-border/60 bg-background/80 px-4 py-5 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                      {metric.label}
                    </dt>
                    <dd className="mt-3 text-3xl font-semibold text-foreground">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative">
              <div className="absolute -inset-x-6 top-4 h-52 rounded-[3rem] bg-gradient-to-r from-[rgba(var(--accent),0.18)] via-[rgba(var(--accent-light),0.12)] to-transparent blur-3xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-white/85 p-6 shadow-soft backdrop-blur dark:bg-surface/90">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-muted">Signature Journey Blueprint</p>
                  <span className="rounded-full bg-[rgba(var(--accent),0.12)] px-3 py-1 text-xs font-semibold text-[rgb(var(--accent))]">
                    Live Preview
                  </span>
                </div>
                <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-border/60 bg-white/90 p-6 shadow-sm dark:bg-background/60">
                  <Image
                    src="/assets/hero-home.svg"
                    alt="Alexander & Troy Tours travel blueprint interface"
                    width={420}
                    height={420}
                    className="h-auto w-full"
                    priority
                    fetchPriority="high"
                  />
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 px-4 py-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(var(--accent),0.12)] font-semibold text-[rgb(var(--accent))]">
                      AI
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Adaptive routing suggestions</p>
                      <p className="text-xs text-muted">Optimised for time, spend, and accessibility.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/80 px-4 py-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(var(--accent-light),0.14)] font-semibold text-[rgb(var(--accent))]">
                      HQ
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Concierge delivery team</p>
                      <p className="text-xs text-muted">Single contact from proposal to execution.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[rgba(var(--accent),0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[rgb(var(--accent))]">
            Why Alexander &amp; Troy
          </span>
          <h2 className="mt-6 text-balance text-4xl font-semibold text-foreground sm:text-5xl">
            Global partners. Local mastery. Seamless execution.
          </h2>
          <p className="mx-auto mt-6 text-lg text-muted">
            Our modular approach removes complexity across sourcing, design, and delivery so your travellers experience curated, future-ready programmes.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/80 p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-[rgba(var(--accent),0.1)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(var(--accent),0.12)] text-[rgb(var(--accent))]">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={pillar.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{pillar.description}</p>
            </div>
          ))}
          <div className="group relative overflow-hidden rounded-2xl border border-transparent bg-gradient-to-br from-[rgba(var(--accent),0.12)] via-[rgba(var(--accent-light),0.12)] to-transparent p-8 shadow-lg sm:col-span-2 xl:col-span-3">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(var(--accent))] text-[rgb(var(--accent-fg))] shadow-soft">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold text-foreground">Immersive concepts, built end-to-end.</h3>
                <p className="text-sm leading-relaxed text-muted">
                  Creative special events, CSR-ready team experiences, and tailored programmes are prototyped with rapid iteration, so you preview every moment before we launch on-site.
                </p>
              </div>
              <Link href="/services" className="btn-secondary self-start whitespace-nowrap">
                View Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Connect */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-gradient-to-br from-[rgba(var(--bg-glass),0.95)] via-[rgba(var(--accent-muted),0.45)] to-transparent px-6 py-12 shadow-xl sm:px-10 lg:px-16 lg:py-20">
          <div className="absolute -top-24 right-10 h-48 w-48 rounded-full bg-[rgba(var(--accent),0.12)] blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-balance text-3xl font-semibold text-foreground sm:text-4xl">
                Stay connected with the team behind the journeys.
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-muted lg:mx-0">
                Follow us for destination intel, programme inspiration, and behind-the-scenes coverage of how we bring premium business travel to life.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start">
                <Link href="/services" className="btn-secondary group">
                  <span>Explore Services</span>
                  <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/contact" className="btn-primary">
                  Join the Newsletter
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {socialChannels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/85 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-[rgba(var(--accent),0.08)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-foreground">{channel.name}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(var(--accent),0.12)] text-[rgb(var(--accent))]">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={channel.icon} />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-muted">{channel.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StructuredData data={websiteSchema} />
    </div>
  )
}
