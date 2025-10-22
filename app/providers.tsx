"use client"

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { ConsentProvider } from '@/lib/consent/state'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
        <ConsentProvider>{children}</ConsentProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
