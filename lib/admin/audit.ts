/**
 * Audit Logging System
 * Tracks all administrative actions for security and compliance
 */

import { adminConfig } from '@/lib/config/admin'

export interface AuditLogEntry {
    action: string
    userId: string
    resource: string
    details?: Record<string, unknown>
    status: 'success' | 'failure'
    timestamp?: Date
    ipAddress?: string
    userAgent?: string
}

interface StoredAuditLog extends AuditLogEntry {
    id: string
    timestamp: Date
}

export interface AuditStats {
    total: number
    byAction: Record<string, number>
    byUser: Record<string, number>
    successRate: number
    recentActivity: number
}

// In-memory storage (in production, use a database)
const auditLogs: StoredAuditLog[] = []
let statsCache: AuditStats | null = null

const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000

/**
 * Log an administrative action
 */
export function auditLog(entry: AuditLogEntry): void {
    if (!adminConfig.audit.enabled) {
        return
    }

    const logEntry: StoredAuditLog = {
        ...entry,
        id: generateId(),
        timestamp: entry.timestamp || new Date(),
    }

    insertLogChronologically(logEntry)
    invalidateStatsCache()

    // Clean up old logs
    void cleanOldLogs()
}

/**
 * Retrieve audit logs with filtering
 */
export function getAuditLogs(options?: {
    userId?: string
    action?: string
    resource?: string
    startDate?: Date
    endDate?: Date
    limit?: number
}): StoredAuditLog[] {
    const results: StoredAuditLog[] = []
    const limit = options?.limit ?? auditLogs.length

    for (const log of auditLogs) {
        if (results.length >= limit) {
            break
        }

        if (options?.userId && log.userId !== options.userId) {
            continue
        }

        if (options?.action && log.action !== options.action) {
            continue
        }

        if (options?.resource && !log.resource.includes(options.resource)) {
            continue
        }

        if (options?.endDate && log.timestamp > options.endDate) {
            continue
        }

        if (options?.startDate && log.timestamp < options.startDate) {
            break
        }

        results.push(cloneLog(log))
    }

    return results
}

/**
 * Get audit logs for a specific user
 */
export function getUserAuditLogs(userId: string, limit: number = 50): StoredAuditLog[] {
    return getAuditLogs({ userId, limit })
}

/**
 * Get recent audit activity
 */
export function getRecentActivity(limit: number = 20): StoredAuditLog[] {
    return getAuditLogs({ limit })
}

/**
 * Export audit logs as JSON
 */
export function exportAuditLogs(options?: {
    startDate?: Date
    endDate?: Date
}): string {
    const logs = getAuditLogs(options)
    return JSON.stringify(
        logs.map(log => ({
            ...log,
            timestamp: log.timestamp.toISOString(),
        })),
        null,
        2,
    )
}

/**
 * Clean up logs older than retention period
 */
function cleanOldLogs(): void {
    const retentionDate = new Date()
    retentionDate.setDate(retentionDate.getDate() - adminConfig.audit.retentionDays)

    let removed = 0
    while (auditLogs.length > 0 && auditLogs[auditLogs.length - 1].timestamp < retentionDate) {
        auditLogs.pop()
        removed += 1
    }

    if (removed > 0) {
        invalidateStatsCache()
    }
}

/**
 * Generate unique ID for audit log entries
 */
function generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

/**
 * Get audit statistics
 */
export function getAuditStats(): AuditStats {
    if (!statsCache) {
        statsCache = computeStatsSnapshot()
    }

    return cloneStats(statsCache)
}

function insertLogChronologically(logEntry: StoredAuditLog) {
    if (auditLogs.length === 0) {
        auditLogs.push(logEntry)
        return
    }

    const timestamp = logEntry.timestamp.getTime()
    const index = auditLogs.findIndex(existing => existing.timestamp.getTime() < timestamp)

    if (index === -1) {
        auditLogs.push(logEntry)
    } else {
        auditLogs.splice(index, 0, logEntry)
    }
}

function computeStatsSnapshot(): AuditStats {
    const byAction: Record<string, number> = {}
    const byUser: Record<string, number> = {}
    let successCount = 0

    for (const log of auditLogs) {
        byAction[log.action] = (byAction[log.action] || 0) + 1
        byUser[log.userId] = (byUser[log.userId] || 0) + 1

        if (log.status === 'success') {
            successCount += 1
        }
    }

    const last24Hours = new Date(Date.now() - TWENTY_FOUR_HOURS_MS)
    let recentActivity = 0
    for (const log of auditLogs) {
        if (log.timestamp >= last24Hours) {
            recentActivity += 1
        } else {
            break
        }
    }

    const total = auditLogs.length
    const successRate = total > 0 ? (successCount / total) * 100 : 0

    return {
        total,
        byAction,
        byUser,
        successRate,
        recentActivity,
    }
}

function invalidateStatsCache() {
    statsCache = null
}

function cloneLog(log: StoredAuditLog): StoredAuditLog {
    return {
        ...log,
        details: log.details ? { ...log.details } : undefined,
        timestamp: new Date(log.timestamp),
    }
}

function cloneStats(stats: AuditStats): AuditStats {
    return {
        total: stats.total,
        successRate: stats.successRate,
        recentActivity: stats.recentActivity,
        byAction: { ...stats.byAction },
        byUser: { ...stats.byUser },
    }
}
