'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const ERROR_MESSAGES: Record<string, string> = {
    AccessDenied: 'Access denied. You must be an authorized administrator with GitHub 2FA enabled and repository access.',
    CredentialsSignin: 'Invalid username or password. Please try again.',
}

export default function AdminLoginPage() {
    const { status } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const error = searchParams?.get('error')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [loginError, setLoginError] = useState('')

    useEffect(() => {
        if (status === 'authenticated') {
            router.replace('/admin/dashboard')
        }
    }, [status, router])

    const handleCredentialsSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setLoginError('')

        try {
            const result = await signIn('credentials', {
                username,
                password,
                redirect: false,
            })

            if (result?.error) {
                setLoginError('Invalid username or password')
            } else if (result?.ok) {
                router.push('/admin/dashboard')
            }
        } catch {
            setLoginError('An error occurred. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleGitHubSignIn = () => {
        void signIn('github', { callbackUrl: '/admin/dashboard' })
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-surface to-accent/10 px-4 py-12">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(var(--accent),0.18),transparent_55%)]" aria-hidden="true" />
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link href="/" className="inline-flex items-center justify-center gap-2">
                        <h1 className="text-3xl font-semibold text-foreground">Alexander & Troy Tours</h1>
                        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                            Admin
                        </span>
                    </Link>
                    <p className="mt-2 text-sm text-muted">Secure portal for authorized administrators</p>
                </div>

                <div className="glass-card overflow-hidden rounded-3xl shadow-2xl">
                    <div className="border-b border-border/30 bg-background/50 px-8 py-6 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 116 6" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 21h6m-3-3v6" />
                            </svg>
                        </div>
                        <h2 className="mt-4 text-2xl font-semibold text-foreground">Secure access required</h2>
                        <p className="mt-2 text-sm text-muted">
                            Sign in with GitHub to continue. Multi-factor authentication is enforced.
                        </p>
                    </div>

                    <div className="space-y-6 px-8 py-10">
                        {(error || loginError) && (
                            <div className="rounded-2xl border border-danger/30 bg-danger/10 p-4 text-left">
                                <p className="text-sm font-semibold text-danger">Authentication failed</p>
                                <p className="mt-1 text-xs text-danger/90">
                                    {loginError || ERROR_MESSAGES[error || ''] || 'An error occurred during sign-in. Please try again.'}
                                </p>
                            </div>
                        )}

                        {/* Quick Login Form */}
                        <form onSubmit={(e) => void handleCredentialsSignIn(e)} className="space-y-4">
                            <div>
                                <label htmlFor="username" className="mb-2 block text-sm font-medium text-foreground">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="admin"
                                    required
                                    className="w-full rounded-xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full rounded-xl border border-border/50 bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading || status === 'loading'}
                                className="btn-primary flex w-full items-center justify-center gap-3"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                <span>{isLoading ? 'Signing in...' : 'Sign in'}</span>
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border/40"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-surface px-2 text-muted">Or continue with</span>
                            </div>
                        </div>

                        {/* GitHub Login */}
                        <button
                            type="button"
                            onClick={handleGitHubSignIn}
                            disabled={status === 'loading'}
                            className="btn-secondary flex w-full items-center justify-center gap-3 bg-[#24292e] text-white hover:bg-[#1b1f23]"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                                />
                            </svg>
                            <span>{status === 'loading' ? 'Preparing…' : 'Sign in with GitHub'}</span>
                        </button>

                        <div className="rounded-2xl border border-border/50 bg-background/60 p-4 text-xs text-muted">
                            <p className="font-semibold text-foreground">Quick Login Credentials</p>
                            <ul className="mt-3 space-y-1">
                                <li>✓ Username: admin</li>
                                <li>✓ Password: Set in environment variables</li>
                                <li>✓ No external dependencies</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-border/30 bg-background/40 px-8 py-5 text-center text-xs text-muted">
                        Administrative activity is monitored and retained per compliance policy.
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to main site
                    </Link>
                </div>
            </div>
        </div>
    )
}
