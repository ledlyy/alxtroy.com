"use client"

import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

import { ConsentProvider } from '@/lib/consent/state'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <ConsentProvider>{children}</ConsentProvider>
    </ThemeProvider>
  )
}
