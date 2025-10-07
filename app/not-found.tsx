import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl py-20 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted">The page you’re looking for doesn’t exist.</p>
      <Link
        href="/"
        className="focus-visible:ring-ring mt-6 inline-block rounded border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2"
      >
        Go home
      </Link>
    </div>
  )
}
