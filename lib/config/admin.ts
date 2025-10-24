/**
 * Admin Panel Configuration
 * Centralized security and access control settings
 */

export const adminConfig = {
    // GitHub OAuth Settings
    github: {
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
        repo: process.env.GITHUB_REPO || 'ledlyy/alxtroy.com',
        branch: process.env.GITHUB_BRANCH || 'main',
        token: process.env.GITHUB_TOKEN!,
    },

    // Authorized Admin Users (GitHub usernames + credential fallback)
    authorizedUsers: (() => {
        const authorized = new Set<string>()

        process.env.ADMIN_GITHUB_USERS
            ?.split(',')
            .map(u => u.trim().toLowerCase())
            .filter(Boolean)
            .forEach(user => authorized.add(user))

        const credentialUser = process.env.ADMIN_USERNAME?.trim().toLowerCase()
        if (credentialUser) {
            authorized.add(credentialUser)
        }

        return Array.from(authorized)
    })(),

    // Session Configuration
    session: {
        maxAge: parseInt(process.env.SESSION_MAX_AGE || '7200', 10), // 2 hours default
        updateAge: 300, // Update session every 5 minutes
    },

    // Rate Limiting Configuration
    rateLimit: {
        max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 min
    },

    // Security Settings
    security: {
        csrfProtection: true,
        requireTwoFactor: true, // GitHub OAuth with 2FA enforcement
        allowedOrigins: [
            process.env.NEXTAUTH_URL || 'http://localhost:3000',
            process.env.NEXT_PUBLIC_SITE_URL || 'https://www.alxtroy.com',
        ],
    },

    // Audit Logging
    audit: {
        enabled: process.env.ENABLE_AUDIT_LOG === 'true',
        retentionDays: parseInt(process.env.AUDIT_LOG_RETENTION_DAYS || '90', 10),
    },

    // Content Management Paths
    contentPaths: {
        events: 'lib/data/data.json',
        blog: 'content/blog',
        destinations: 'content/destinations.ts',
        services: 'content/services.ts',
    },

    // GitHub API Configuration
    github_api: {
        baseUrl: 'https://api.github.com',
        version: '2022-11-28',
        userAgent: 'AlexanderTroyTours-Admin',
    },
} as const

export type AdminConfig = typeof adminConfig

/**
 * Validates admin configuration on startup
 */
export function validateAdminConfig(): { valid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!adminConfig.github.clientId) {
        errors.push('GITHUB_ID is required for OAuth authentication')
    }

    if (!adminConfig.github.clientSecret) {
        errors.push('GITHUB_SECRET is required for OAuth authentication')
    }

    if (!adminConfig.github.token) {
        errors.push('GITHUB_TOKEN is required for repository operations')
    }

    if (adminConfig.authorizedUsers.length === 0) {
        errors.push('ADMIN_GITHUB_USERS must contain at least one GitHub username with admin access')
    }

    if (!process.env.NEXTAUTH_SECRET) {
        errors.push('NEXTAUTH_SECRET is required for session encryption')
    }

    return {
        valid: errors.length === 0,
        errors,
    }
}
