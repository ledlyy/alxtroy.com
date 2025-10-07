import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import { z } from 'zod'

const rateLimitWindowMs = 60_000
const maxRequestsPerWindow = 10
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  company: z.string().optional(),
  token: z.string().min(1),
  hp: z.string().optional(),
})

type ContactPayload = z.infer<typeof contactSchema>

type TurnstileResponse = {
  success: boolean
  "error-codes"?: string[]
}

const turnstileEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

function sanitizeInput(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]
    return first ? first.trim() : 'unknown'
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp.trim()
  return 'unknown'
}

function withinRateLimit(ip: string): boolean {
  const now = Date.now()
  const bucket = rateLimitStore.get(ip)
  if (!bucket || now > bucket.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + rateLimitWindowMs })
    return true
  }
  if (bucket.count >= maxRequestsPerWindow) {
    return false
  }
  bucket.count += 1
  return true
}

async function verifyTurnstile(token: string, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    throw new Error('Turnstile secret key is not configured')
  }
  const params = new URLSearchParams({
    secret,
    response: token,
  })
  if (remoteIp && remoteIp !== 'unknown') {
    params.append('remoteip', remoteIp)
  }
  const response = await fetch(turnstileEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
  if (!response.ok) {
    throw new Error('Unable to verify Turnstile token')
  }
  const data = (await response.json()) as TurnstileResponse
  if (!data.success) {
    throw new Error('Verification failed')
  }
}

function createTransport(): Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options> {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || '587')
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!host || !port || !user || !pass) {
    throw new Error('SMTP configuration is incomplete')
  }
  const transportOptions: SMTPTransport.Options = {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  }
  const transporter = nodemailer.createTransport<SMTPTransport.SentMessageInfo>(transportOptions)
  return transporter
}

async function sendEmail(payload: ContactPayload, ip: string) {
  const transporter = createTransport()
  const to = process.env.MAIL_TO
  const from = process.env.MAIL_FROM || process.env.SMTP_USER
  if (!to || !from) {
    throw new Error('Email recipients are not configured')
  }
  const subject = `New enquiry from ${sanitizeInput(payload.name)}`
  const lines = [
    `Name: ${sanitizeInput(payload.name)}`,
    `Email: ${sanitizeInput(payload.email)}`,
    payload.company ? `Company: ${sanitizeInput(payload.company)}` : null,
    `Message: ${sanitizeInput(payload.message)}`,
    `IP Address: ${ip}`,
  ]
    .filter(Boolean)
    .join('\n')

  await transporter.sendMail({
    to,
    from,
    subject,
    text: lines,
  })
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    if (!withinRateLimit(ip)) {
      return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 })
    }

    const payload = contactSchema.parse(await request.json())

    if (payload.hp && payload.hp.trim().length > 0) {
      return NextResponse.json({ success: true })
    }

    await verifyTurnstile(payload.token, ip)
    await sendEmail(payload, ip)

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Submission failed'
    const status = message === 'Verification failed' ? 403 : 400
    return NextResponse.json({ success: false, error: message }, { status })
  }
}
