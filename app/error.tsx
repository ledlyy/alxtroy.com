"use client"

import Link from 'next/link'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl py-20 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-muted">{error.message || 'An unexpected error occurred.'}</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="focus-visible:ring-ring rounded border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2"
        >
          Try again
        </button>
        <Link
          href="/"
          className="focus-visible:ring-ring rounded border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
