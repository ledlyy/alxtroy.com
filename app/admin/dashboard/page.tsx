import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { DashboardClient } from '@/components/admin/DashboardClient'

import type { AuditStats } from '@/lib/admin/audit'
import { getAuditStats, getRecentActivity } from '@/lib/admin/audit'
import { authOptions } from '@/lib/auth/options'
import { adminConfig } from '@/lib/config/admin'

type SerializedActivityLog = {
    id: string
    action: string
    resource: string
    status: 'success' | 'failure'
    timestamp: string
    userId: string
}

type SerializableStats = AuditStats

export default async function AdminDashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        redirect('/admin/login')
    }

    const username =
        (typeof session.user.login === 'string' && session.user.login.toLowerCase()) ||
        session.user.email?.split('@')[0]?.toLowerCase() ||
        ''

    if (!adminConfig.authorizedUsers.includes(username)) {
        redirect('/admin/login?error=AccessDenied')
    }

    const stats = getAuditStats()
    const activity = getRecentActivity(20)

    const serializedActivity: SerializedActivityLog[] = activity.map(log => ({
        id: log.id,
        action: log.action,
        resource: log.resource,
        status: log.status,
        timestamp: log.timestamp.toISOString(),
        userId: log.userId,
    }))

    const serializedStats: SerializableStats = {
        ...stats,
        byAction: { ...stats.byAction },
        byUser: { ...stats.byUser },
    }

    return (
        <DashboardClient
            session={session}
            stats={serializedStats}
            recentActivity={serializedActivity}
        />
    )
}
