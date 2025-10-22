'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { useMemo, useState, useTransition } from 'react'

type DashboardStats = {
    total: number
    successRate: number
    recentActivity: number
    byAction: Record<string, number>
    byUser: Record<string, number>
}

type DashboardActivityLog = {
    id: string
    action: string
    resource: string
    status: 'success' | 'failure'
    timestamp: string
    userId: string
}

const DATE_FORMATTER = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
})

type Props = {
    session: Session
    stats: DashboardStats
    recentActivity: DashboardActivityLog[]
}

export function DashboardClient({ session, stats, recentActivity }: Props) {
    const router = useRouter()
    const [isRefreshing, startTransition] = useTransition()
    const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failure'>('all')

    const displayName =
        session.user?.name?.split(' ')[0] ||
        (typeof session.user?.login === 'string' ? session.user.login : '') ||
        'Admin'

    const filteredActivity = useMemo(() => {
        if (statusFilter === 'all') {
            return recentActivity
        }
        return recentActivity.filter(log => log.status === statusFilter)
    }, [recentActivity, statusFilter])

    const uniqueAdmins = useMemo(() => Object.keys(stats.byUser).length, [stats.byUser])

    const topAction = useMemo(() => {
        let result: { action: string; count: number } | null = null
        for (const [action, count] of Object.entries(stats.byAction)) {
            if (!result || count > result.count) {
                result = { action, count }
            }
        }
        return result
    }, [stats.byAction])

    const topAdmin = useMemo(() => {
        let result: { userId: string; count: number } | null = null
        for (const [userId, count] of Object.entries(stats.byUser)) {
            if (!result || count > result.count) {
                result = { userId, count }
            }
        }
        return result
    }, [stats.byUser])

    const handleSignOut = () => {
        void signOut({ callbackUrl: '/admin/login' })
    }

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh()
        })
    }

    const securityScore = Math.round(Math.min(100, stats.successRate + stats.recentActivity))

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-surface/80 to-accent/10">
            <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
                <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-5">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-foreground">
                            Alexander & Troy Tours
                            <span className="hidden text-sm font-medium text-muted sm:inline">Admin Control</span>
                        </Link>
                        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                            Secure Session
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleRefresh}
                            className="btn-secondary hidden text-xs sm:inline-flex"
                            aria-label="Refresh dashboard data"
                            disabled={isRefreshing}
                        >
                            {isRefreshing ? 'Refreshing…' : 'Refresh'}
                        </button>
                        <div className="flex items-center gap-3 rounded-full bg-surface/80 px-3 py-2 shadow-soft">
                            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-border/60 bg-accent/15">
                                {session.user?.image ? (
                                    <Image
                                        src={session.user.image}
                                        alt={`${displayName}'s avatar`}
                                        fill
                                        className="object-cover"
                                        sizes="36px"
                                    />
                                ) : (
                                    <span className="flex h-full w-full items-center justify-center text-sm font-semibold text-accent">
                                        {displayName.slice(0, 1).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-foreground">{session.user?.name || session.user?.login}</p>
                                <p className="text-xs text-muted">
                                    {session.user?.login ? `@${session.user.login}` : session.user?.email}
                                </p>
                            </div>
                        </div>
                        <button type="button" onClick={handleSignOut} className="btn-secondary text-xs">
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-10">
                <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
                    <div>
                        <p className="text-sm text-muted">Secure operations overview</p>
                        <h1 className="mt-2 text-4xl font-bold text-foreground">
                            Welcome back, <span className="gradient-text">{displayName}</span>
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 rounded-2xl border border-accent/20 bg-accent/5 px-4 py-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-success" />
                            <div>
                                <p className="text-xs uppercase tracking-wide text-muted">Uptime</p>
                                <p className="text-sm font-semibold text-foreground">Operational</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 rounded-2xl border border-success/20 bg-success/5 px-4 py-3">
                            <span className="text-2xl font-bold text-success">{securityScore}%</span>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-muted">Security posture</p>
                                <p className="text-sm font-semibold text-success">Healthy</p>
                            </div>
                        </div>
                    </div>
                </div>

                <section aria-label="Key performance indicators" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <article className="group rounded-2xl border border-border/40 bg-surface/80 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Total Actions</p>
                                <p className="mt-3 text-3xl font-bold text-foreground">{stats.total}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                                </svg>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-muted">Tracked changes across all admin modules.</p>
                    </article>

                    <article className="group rounded-2xl border border-border/40 bg-surface/80 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Success Rate</p>
                                <p className="mt-3 text-3xl font-bold text-success">{stats.successRate.toFixed(1)}%</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-muted">Successful operations vs. failures for all recorded events.</p>
                    </article>

                    <article className="group rounded-2xl border border-border/40 bg-surface/80 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Activity (24h)</p>
                                <p className="mt-3 text-3xl font-bold text-foreground">{stats.recentActivity}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2 4 4 8-8 4 4" />
                                </svg>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-muted">Number of audited events recorded in the last 24 hours.</p>
                    </article>

                    <article className="group rounded-2xl border border-border/40 bg-surface/80 p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Active Admins</p>
                                <p className="mt-3 text-3xl font-bold text-foreground">{uniqueAdmins}</p>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 11a3 3 0 10-6 0 3 3 0 006 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-muted">Unique administrators executing actions during the retention window.</p>
                    </article>
                </section>

                <section className="mt-10 grid gap-6 lg:grid-cols-[2fr,1fr]">
                    <article className="glass-card relative overflow-hidden rounded-3xl p-6">
                        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />
                        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold text-foreground">Recent Activity</h2>
                                <p className="text-sm text-muted">Real-time audit feed. Filter by status to investigate anomalies.</p>
                            </div>
                            <div className="inline-flex rounded-full border border-border/60 bg-background/60 p-1 text-xs font-semibold text-muted">
                                {(['all', 'success', 'failure'] as const).map(filter => (
                                    <button
                                        key={filter}
                                        type="button"
                                        onClick={() => setStatusFilter(filter)}
                                        className={`rounded-full px-3 py-1 transition ${statusFilter === filter ? 'bg-accent text-[rgb(var(--accent-fg))] shadow-sm' : 'hover:text-foreground'}`}
                                        aria-pressed={statusFilter === filter}
                                    >
                                        {filter === 'all' ? 'All' : filter === 'success' ? 'Success' : 'Failure'}
                                    </button>
                                ))}
                            </div>
                        </header>

                        {filteredActivity.length === 0 ? (
                            <p className="rounded-2xl border border-border/40 bg-background/60 p-6 text-center text-sm text-muted">
                                No activity recorded for the selected filter.
                            </p>
                        ) : (
                            <ul className="space-y-3" aria-live="polite">
                                {filteredActivity.map(log => (
                                    <li
                                        key={log.id}
                                        className="group relative flex items-start gap-4 rounded-2xl border border-border/40 bg-background/70 p-5 transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
                                    >
                                        <span
                                            className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${log.status === 'success'
                                                ? 'bg-success/15 text-success'
                                                : 'bg-danger/15 text-danger'
                                                }`}
                                            aria-hidden="true"
                                        >
                                            {log.status === 'success' ? '✓' : '✕'}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <p className="text-sm font-semibold text-foreground">{log.action}</p>
                                                <span className="rounded-full bg-border/50 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                                                    {DATE_FORMATTER.format(new Date(log.timestamp))}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs text-muted">
                                                {log.resource}
                                            </p>
                                            <p className="mt-3 text-xs font-medium text-muted">
                                                Performed by <span className="text-foreground">{log.userId}</span>
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </article>

                    <aside className="space-y-6">
                        <section className="rounded-3xl border border-border/50 bg-surface/80 p-6 shadow-xl">
                            <h3 className="text-lg font-semibold text-foreground">Security insights</h3>
                            <p className="mt-1 text-xs text-muted">Quick pulse on activity patterns to help prioritize reviews.</p>
                            <div className="mt-5 space-y-4 text-sm">
                                <div className="flex items-start gap-3 rounded-2xl border border-border/40 bg-background/60 p-4">
                                    <span className="mt-0.5 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                                    <div>
                                        <p className="font-semibold text-foreground">Most common action</p>
                                        <p className="text-xs text-muted">
                                            {topAction ? `${topAction.action} (${topAction.count})` : 'No actions recorded yet'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-2xl border border-border/40 bg-background/60 p-4">
                                    <span className="mt-0.5 h-2 w-2 rounded-full bg-success" aria-hidden="true" />
                                    <div>
                                        <p className="font-semibold text-foreground">Top contributor</p>
                                        <p className="text-xs text-muted">
                                            {topAdmin ? `${topAdmin.userId} (${topAdmin.count})` : 'Awaiting administrator activity'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 rounded-2xl border border-border/40 bg-background/60 p-4">
                                    <span className="mt-0.5 h-2 w-2 rounded-full bg-warning" aria-hidden="true" />
                                    <div>
                                        <p className="font-semibold text-foreground">Latest event window</p>
                                        <p className="text-xs text-muted">
                                            {recentActivity[0]
                                                ? `Last event recorded ${DATE_FORMATTER.format(new Date(recentActivity[0].timestamp))}`
                                                : 'No events recorded in the current retention window'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-border/50 bg-surface/80 p-6 shadow-xl">
                            <h3 className="text-lg font-semibold text-foreground">Admin utilities</h3>
                            <p className="mt-1 text-xs text-muted">Quick links to plan future enhancements.</p>
                            <ul className="mt-4 space-y-3 text-sm">
                                {[
                                    { title: 'Content Editor', description: 'Update site copy & assets', href: '/admin/content', status: 'Planned' },
                                    { title: 'Event Management', description: 'Curate B2B showcase', href: '/admin/events', status: 'Planned' },
                                    { title: 'File Manager', description: 'Secure media uploads', href: '/admin/files', status: 'Planned' },
                                    { title: 'Audit Logs', description: 'Historical compliance reporting', href: '/admin/logs', status: 'Planned' },
                                ].map(tool => (
                                    <li key={tool.href} className="flex items-center justify-between rounded-2xl border border-dashed border-border/50 bg-background/50 px-4 py-3">
                                        <div>
                                            <p className="font-semibold text-foreground/80">{tool.title}</p>
                                            <p className="text-xs text-muted">{tool.description}</p>
                                        </div>
                                        <span className="rounded-full bg-border/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
                                            {tool.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </aside>
                </section>
            </main>
        </div>
    )
}
