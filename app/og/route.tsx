import { ImageResponse } from 'next/og'

import { siteConfig } from '@/lib/config/site'

export const runtime = 'edge'

const accent = '#A38555'
const foreground = '#0b1220'
const background = '#ffffff'

function getParam(params: URLSearchParams, key: string, fallback: string): string {
  const value = params.get(key)
  return value && value.trim().length > 0 ? value : fallback
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const width = Number.parseInt(searchParams.get('w') || '1200', 10)
  const height = Number.parseInt(searchParams.get('h') || '630', 10)
  const title = getParam(searchParams, 'title', siteConfig.metadata.title)
  const subtitle = getParam(searchParams, 'subtitle', siteConfig.metadata.description)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: background,
          color: foreground,
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              width: 220,
              height: 220,
              margin: 60,
              borderRadius: '9999px',
              backgroundColor: `${accent}33`,
              filter: 'blur(12px)',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: `${accent}26`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: 1,
              }}
            >
              AT
            </div>
            <div style={{ fontSize: 22, fontWeight: 600 }}>{siteConfig.name}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h1 style={{ fontSize: 72, lineHeight: 1.1, margin: 0 }}>{title}</h1>
            <p style={{ fontSize: 28, color: '#4b5563', margin: 0 }}>{subtitle}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', fontSize: 22, gap: 12 }}>
          <span>{siteConfig.brand.tagline}</span>
          <span style={{ width: 40, height: 4, backgroundColor: accent, borderRadius: 9999 }} />
          <span>{siteConfig.url.replace(/^https?:\/\//, '')}</span>
        </div>
      </div>
    ),
    {
      width: Number.isFinite(width) ? width : 1200,
      height: Number.isFinite(height) ? height : 630,
    },
  )
}
