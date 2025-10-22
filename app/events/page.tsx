import type { Metadata } from 'next'
import Link from 'next/link'

import eventsData from '@/lib/data/data.json'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
    title: 'B2B Events',
    description: 'Discover upcoming B2B trade shows, exhibitions, and corporate events organized by Alexander & Troy Tours.',
})

export default function EventsPage() {
    const { event, companies } = eventsData

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
        }).format(date)
    }

    const getEventDuration = (start: string, end: string) => {
        const startDate = new Date(start)
        const endDate = new Date(end)
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        return days
    }

    const eventDuration = getEventDuration(event.startDate, event.endDate)

    return (
        <div className="min-h-screen space-y-20 pb-24 pt-8">
            {/* Hero Section */}
            <section className="container mx-auto px-4">
                <div className="glass-card overflow-hidden rounded-[2rem] shadow-2xl">
                    <div className="px-8 py-16 sm:px-12 sm:py-20 lg:px-16">
                        <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            B2B Trade Events
                        </span>
                        <h1 className="mt-6 max-w-4xl text-balance text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                            Upcoming Business Events
                        </h1>
                        <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
                            Connect with industry leaders and explore new opportunities at our professionally organized B2B trade shows and exhibitions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Event */}
            <section className="container mx-auto px-4">
                <div className="overflow-hidden rounded-[2rem] border border-border/50 bg-gradient-to-br from-surface to-accent/5 shadow-xl">
                    <div className="grid gap-0 lg:grid-cols-5">
                        {/* Event Details */}
                        <div className="space-y-8 p-8 sm:p-12 lg:col-span-3 lg:p-16">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                                    </span>
                                    {event.status}
                                </div>
                                <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
                                    {event.title}
                                </h2>
                                <p className="text-lg text-muted">Organized by {event.organizer}</p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div className="space-y-2 rounded-xl border border-border/50 bg-background/50 p-6">
                                    <div className="flex items-center gap-3 text-accent">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-semibold">Event Dates</span>
                                    </div>
                                    <p className="text-sm text-muted">
                                        <strong className="block text-foreground">Starts:</strong>
                                        {formatDate(event.startDate)}
                                    </p>
                                    <p className="text-sm text-muted">
                                        <strong className="block text-foreground">Ends:</strong>
                                        {formatDate(event.endDate)}
                                    </p>
                                    <p className="mt-2 text-xs font-semibold text-accent">
                                        {eventDuration}-day event
                                    </p>
                                </div>

                                <div className="space-y-2 rounded-xl border border-border/50 bg-background/50 p-6">
                                    <div className="flex items-center gap-3 text-accent">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="font-semibold">Location</span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-foreground">
                                        {event.location}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/contact" className="btn-primary group">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Register Interest</span>
                                </Link>
                                <Link href="#exhibitors" className="btn-secondary">
                                    View Exhibitors
                                </Link>
                            </div>
                        </div>

                        {/* Event Stats */}
                        <div className="border-t border-border/50 bg-background/30 p-8 sm:p-12 lg:col-span-2 lg:border-l lg:border-t-0">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">Event Overview</h3>
                                    <div className="mt-6 space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold text-foreground">{companies.length}</p>
                                                <p className="text-sm text-muted">Exhibiting Companies</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold text-foreground">
                                                    {new Set(companies.flatMap(c => c.categories)).size}
                                                </p>
                                                <p className="text-sm text-muted">Product Categories</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-3xl font-bold text-foreground">{eventDuration}</p>
                                                <p className="text-sm text-muted">Days of Networking</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Exhibitors Section */}
            <section id="exhibitors" className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
                        Exhibiting Companies
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted">
                        Meet the leading manufacturers and suppliers showcasing their products
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {companies.map((company) => (
                        <div
                            key={company.id}
                            className="card-hover group overflow-hidden rounded-2xl border border-border/50 bg-surface shadow-md"
                        >
                            <div className="p-8">
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                </div>

                                <h3 className="line-clamp-2 text-xl font-bold text-foreground">
                                    {company.name}
                                </h3>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {company.categories.slice(0, 2).map((category) => (
                                        <span
                                            key={category}
                                            className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                                        >
                                            {category}
                                        </span>
                                    ))}
                                    {company.categories.length > 2 && (
                                        <span className="inline-flex rounded-full bg-muted/20 px-3 py-1 text-xs font-medium text-muted">
                                            +{company.categories.length - 2} more
                                        </span>
                                    )}
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    {company.brochure && (
                                        <a
                                            href={company.brochure}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-700"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Brochure
                                        </a>
                                    )}
                                    {company.website && (
                                        <a
                                            href={`https://${company.website.replace(/^https?:\/\//, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-700"
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                            Website
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4">
                <div className="glass-card overflow-hidden rounded-[2rem] text-center shadow-2xl">
                    <div className="px-8 py-16 sm:px-12 sm:py-20">
                        <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
                            Ready to Participate?
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted">
                            Contact us today to reserve your spot or learn more about exhibition opportunities at this exclusive B2B event.
                        </p>
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link href="/contact" className="btn-primary">
                                Contact Event Team
                            </Link>
                            <Link href="/services" className="btn-secondary">
                                Our Services
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
