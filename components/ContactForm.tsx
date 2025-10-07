"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useId, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  company: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  hp: z.string().optional(),
})

export type ContactFormValues = z.infer<typeof ContactSchema>

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

type TurnstileStatus = {
  token: string | null
  error: string | null
}

let turnstileLoader: Promise<void> | null = null

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          'error-callback'?: () => void
          'expired-callback'?: () => void
          appearance?: 'always' | 'interaction-only' | 'execute'
          theme?: 'light' | 'dark' | 'auto'
        }
      ) => string
      reset: (widgetId: string) => void
    }
  }
}

async function loadTurnstileScript(): Promise<void> {
  if (turnstileLoader) return turnstileLoader
  turnstileLoader = new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve()
      return
    }
    if (window.turnstile) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Turnstile'))
    document.head.appendChild(script)
  })
  return turnstileLoader
}

export function ContactForm() {
  const form = useForm<ContactFormValues>({ resolver: zodResolver(ContactSchema) })
  const { register, handleSubmit, reset, formState } = form
  const { errors } = formState
  const [status, setStatus] = useState<FormStatus>('idle')
  const [turnstileStatus, setTurnstileStatus] = useState<TurnstileStatus>({ token: null, error: null })
  const containerRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)
  const statusMessageId = useId()

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) {
      setTurnstileStatus({ token: null, error: 'Turnstile site key missing' })
      return
    }

    let cancelled = false

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'light',
          appearance: 'always',
          callback: (token) => {
            setTurnstileStatus({ token, error: null })
          },
          'error-callback': () => {
            setTurnstileStatus({ token: null, error: 'Verification failed. Please reload the widget.' })
          },
          'expired-callback': () => {
            setTurnstileStatus({ token: null, error: 'Verification expired. Please try again.' })
          },
        })
      })
      .catch(() => {
        setTurnstileStatus({ token: null, error: 'Unable to load verification widget. Please try again later.' })
      })

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
      }
    }
  }, [])

  const submitHandler = async (values: ContactFormValues) => {
    if (status === 'loading') return
    if ((values.hp || '').trim().length > 0) {
      return
    }
    if (!turnstileStatus.token) {
      setTurnstileStatus((prev) => ({ ...prev, error: prev.error || 'Please complete the verification challenge.' }))
      return
    }

    setStatus('loading')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          message: values.message,
          token: turnstileStatus.token,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to submit')
      }
      setStatus('success')
      reset()
      setTurnstileStatus({ token: null, error: null })
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
      }
    } catch (error) {
      console.error('Contact form submission failed', error)
      setStatus('error')
    }
  }

  const disableSubmit = status === 'loading'

  const submitHandlerWithEvent = handleSubmit(submitHandler)

  return (
    <form
      noValidate
      className="space-y-6"
      aria-describedby={status !== 'idle' ? statusMessageId : undefined}
      onSubmit={(event) => {
        void submitHandlerWithEvent(event)
      }}
    >
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp-field">Leave this field empty</label>
        <input id="hp-field" type="text" tabIndex={-1} autoComplete="off" {...register('hp')} />
      </div>

      <div>
        <label className="block text-sm font-semibold" htmlFor="contact-name">
          Name
        </label>
        <input
          id="contact-name"
          className="focus-visible:ring-ring mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2"
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p id="contact-name-error" className="mt-2 text-sm text-danger">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold" htmlFor="contact-email">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          className="focus-visible:ring-ring mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2"
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <p id="contact-email-error" className="mt-2 text-sm text-danger">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold" htmlFor="contact-company">
          Company (optional)
        </label>
        <input
          id="contact-company"
          className="focus-visible:ring-ring mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2"
          autoComplete="organization"
          {...register('company')}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold" htmlFor="contact-message">
          Brief details
        </label>
        <textarea
          id="contact-message"
          rows={6}
          className="focus-visible:ring-ring mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-2"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-2 text-sm text-danger">
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
        <div ref={containerRef} className="h-[65px]" aria-live="polite" />
        {turnstileStatus.error && (
          <p className="mt-2 text-sm text-danger">{turnstileStatus.error}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={disableSubmit}
        className="focus-visible:ring-ring inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[rgb(var(--accent-fg))] shadow-soft transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2"
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>

      <p id={statusMessageId} className="sr-only" aria-live="polite">
        {status === 'success' && 'Message sent successfully.'}
        {status === 'error' && 'Something went wrong. Please try again or email sales@alxtroy.com.'}
      </p>

      {status === 'success' && (
        <p className="rounded-lg bg-success/10 px-4 py-3 text-sm text-success">
          Thank you—our team will be in touch shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">
          Something went wrong. Please try again or email us directly at sales@alxtroy.com.
        </p>
      )}
    </form>
  )
}
