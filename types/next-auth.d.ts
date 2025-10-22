import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: DefaultSession['user'] & {
            accessToken?: string
            userId?: string
            login?: string
        }
    }
}

import 'next-auth/jwt'

declare module 'next-auth/jwt' {
    interface JWT {
        accessToken?: string
        userId?: string
        username?: string
        loginTime?: number
    }
}
