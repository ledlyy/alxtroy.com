/**
 * Minimal GitHub service utilities used by the admin panel
 * Provides helper methods to validate collaborator access.
 */

import { adminConfig } from '@/lib/config/admin'

const API_BASE_URL = 'https://api.github.com'

function getRepositoryTuple(): { owner: string; repo: string } {
    const [owner, repo] = adminConfig.github.repo.split('/')
    if (!owner || !repo) {
        throw new Error(`Invalid GITHUB_REPO value: ${adminConfig.github.repo}`)
    }
    return { owner, repo }
}

async function githubRequest(path: string, init?: RequestInit): Promise<Response> {
    const headers: HeadersInit = {
        Accept: 'application/vnd.github+json',
        'User-Agent': adminConfig.github_api.userAgent,
        Authorization: `token ${adminConfig.github.token}`,
        'X-GitHub-Api-Version': adminConfig.github_api.version,
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers: {
            ...headers,
            ...init?.headers,
        },
        cache: 'no-store',
    })

    return response
}

async function verifyCollaboratorAccess(username: string): Promise<boolean> {
    const normalized = username.toLowerCase()
    const { owner, repo } = getRepositoryTuple()
    const response = await githubRequest(`/repos/${owner}/${repo}/collaborators/${normalized}`)

    if (response.status === 204) {
        return true
    }

    if (response.status === 404) {
        return false
    }

    console.error('Unexpected GitHub response when checking collaborator access', response.status)
    return false
}

export const githubService = {
    /**
     * GitHub does not expose 2FA status via public APIs.
     * Return null to indicate unknown status so that downstream flows can decide how to proceed.
     */
    verifyUser2FA(_username: string): boolean | null {
        return null
    },

    async verifyUserAccess(username: string): Promise<boolean> {
        try {
            return await verifyCollaboratorAccess(username)
        } catch (error) {
            console.error('Failed to verify GitHub collaborator access', error)
            return false
        }
    },
}

export type GithubService = typeof githubService
