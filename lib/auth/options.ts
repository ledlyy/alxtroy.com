import type { NextAuthOptions } from 'next-auth'
import type { Account, Profile } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

import { auditLog } from '@/lib/admin/audit'
import { githubService } from '@/lib/admin/github'
import { adminConfig } from '@/lib/config/admin'

type ProfileWithLogin = Profile & { login?: string }
type AccountWithGitHubFields = Account & { access_token?: string; providerAccountId?: string }

function extractLogin(profile: Profile | undefined): string | undefined {
  const candidate = profile as ProfileWithLogin | undefined
  if (candidate && typeof candidate.login === 'string') {
    return candidate.login.toLowerCase()
  }
  return undefined
}

function extractAccountId(account: Account | null | undefined): string | undefined {
  const candidate = account as AccountWithGitHubFields | null | undefined
  if (candidate && typeof candidate.providerAccountId === 'string') {
    return candidate.providerAccountId.toLowerCase()
  }
  return undefined
}

function extractAccessToken(account: Account | null | undefined): string | undefined {
  const candidate = account as AccountWithGitHubFields | null | undefined
  if (candidate && typeof candidate.access_token === 'string') {
    return candidate.access_token
  }
  return undefined
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Admin Login',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },
      authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const adminUsername = process.env.ADMIN_USERNAME
        const adminPassword = process.env.ADMIN_PASSWORD

        if (!adminUsername || !adminPassword) {
          console.error('Admin credentials not configured in environment variables')
          return null
        }

        // Simple but secure credential check
        if (credentials.username === adminUsername && credentials.password === adminPassword) {
          auditLog({
            action: 'admin_login',
            userId: credentials.username,
            resource: 'admin_panel',
            details: { provider: 'credentials' },
            status: 'success',
          })

          return {
            id: credentials.username,
            name: credentials.username,
            email: `${credentials.username}@admin.local`,
            login: credentials.username,
          }
        }

        auditLog({
          action: 'failed_login_attempt',
          userId: credentials.username,
          resource: 'admin_panel',
          details: { provider: 'credentials', reason: 'invalid_credentials' },
          status: 'failure',
        })

        return null
      },
    }),
    GithubProvider({
      clientId: adminConfig.github.clientId,
      clientSecret: adminConfig.github.clientSecret,
      authorization: {
        params: {
          scope: 'read:user user:email repo',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Skip additional checks for credentials provider (already verified in authorize)
      if (account?.provider === 'credentials') {
        return true
      }

      const profileLogin = extractLogin(profile)
      const accountLogin = extractAccountId(account)
      const emailLogin = typeof user.email === 'string' ? user.email.split('@')[0]?.toLowerCase() : undefined
      const username = profileLogin || accountLogin || emailLogin || ''

      if (!username || !adminConfig.authorizedUsers.includes(username)) {
        auditLog({
          action: 'unauthorized_login_attempt',
          userId: username || user.email || 'unknown',
          resource: 'admin_panel',
          details: { provider: account?.provider },
          status: 'failure',
        })
        return false
      }

      if (adminConfig.security.requireTwoFactor) {
        const hasTwoFactor = githubService.verifyUser2FA(username)
        if (hasTwoFactor === false) {
          auditLog({
            action: 'login_without_2fa',
            userId: username,
            resource: 'admin_panel',
            details: { provider: account?.provider },
            status: 'failure',
          })
          return false
        }

        if (hasTwoFactor === null) {
          auditLog({
            action: '2fa_verification_unconfirmed',
            userId: username,
            resource: 'admin_panel',
            details: { provider: account?.provider },
            status: 'success',
          })
        }
      }

      const hasRepositoryAccess = await githubService.verifyUserAccess(username)
      if (!hasRepositoryAccess) {
        auditLog({
          action: 'insufficient_permissions',
          userId: username,
          resource: 'admin_panel',
          details: { provider: account?.provider, reason: 'missing_repository_access' },
          status: 'failure',
        })
        return false
      }

      auditLog({
        action: 'admin_login',
        userId: username,
        resource: 'admin_panel',
        details: {
          provider: account?.provider,
          name: user.name,
        },
        status: 'success',
      })

      return true
    },
    jwt({ token, user, account, profile }) {
      if (user) {
        const tokenRecord = token as Record<string, unknown>

        // For credentials provider
        if (account?.provider === 'credentials') {
          const userRecord = user as typeof user & { login?: string }
          tokenRecord.userId = user.email || user.id
          tokenRecord.login = userRecord.login || user.name || user.id
          return token
        }

        // For GitHub provider
        if (typeof user.email === 'string') {
          tokenRecord.userId = user.email
        }
        const accessToken = extractAccessToken(account)
        if (accessToken) {
          tokenRecord.accessToken = accessToken
        }

        if (account?.provider === 'github') {
          const profileLogin = extractLogin(profile)
          const providerAccountId = extractAccountId(account)
          const fallbackFromEmail =
            typeof user?.email === 'string' ? user.email.split('@')[0]?.toLowerCase() : undefined

          const login = profileLogin || providerAccountId || fallbackFromEmail
          if (login) {
            tokenRecord.login = login
          }
        }
      }

      return token
    },
    session({ session, token }) {
      if (session.user) {
        const sessionUser = session.user as typeof session.user & {
          accessToken?: string
          userId?: string
          login?: string
        }
        const tokenRecord = token as Record<string, unknown>
        sessionUser.accessToken = typeof tokenRecord.accessToken === 'string' ? tokenRecord.accessToken : undefined
        sessionUser.userId = typeof tokenRecord.userId === 'string' ? tokenRecord.userId : undefined
        const tokenLogin = typeof tokenRecord.login === 'string' ? tokenRecord.login : undefined
        sessionUser.login = tokenLogin || session.user.email?.split('@')[0]?.toLowerCase()
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: adminConfig.session.maxAge,
    updateAge: adminConfig.session.updateAge,
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  events: {
    signOut({ token }) {
      auditLog({
        action: 'admin_logout',
        userId: (token.userId as string) || 'unknown',
        resource: 'admin_panel',
        details: {},
        status: 'success',
      })
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
