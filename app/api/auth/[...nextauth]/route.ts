/**
 * NextAuth.js configuration for the admin portal.
 * Uses GitHub OAuth and validates collaborators against the allow list.
 */

import NextAuth from 'next-auth'

import { authOptions } from '@/lib/auth/options'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
