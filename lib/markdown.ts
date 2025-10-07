import { slugify } from '@/lib/utils'

export type Heading = { text: string; depth: number; id: string }

export function estimateReadingTime(text: string, wordsPerMinute = 200): number {
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / wordsPerMinute))
}

export function extractHeadings(md: string): Heading[] {
  const lines = (md || '').split('\n')
  const out: Heading[] = []
  for (const line of lines) {
    const m = /^(#{1,6})\s+(.+)$/.exec(line)
    if (m) {
      const depth = m[1].length
      const text = m[2].trim()
      const id = slugify(text)
      out.push({ text, depth, id })
    }
  }
  return out
}

// Minimal markdown -> HTML transformer to improve upon paragraph-only rendering.
// Supports headings (#..######), fenced code blocks (```), and paragraphs.
export function markdownToHtml(md: string): string {
  const lines = (md || '').split('\n')
  const html: string[] = []
  let inCode = false
  let codeLang: string | undefined
  let codeBuffer: string[] = []

  function flushParagraph(paragraph: string[]) {
    const text = paragraph.join(' ').trim()
    if (text) html.push(`<p>${escapeHtml(text)}</p>`)
  }

  function flushCode() {
    if (!inCode) return
    const cls = codeLang ? ` class="language-${codeLang}"` : ''
    html.push(`<pre><code${cls}>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`) // no syntax highlight; CSS only
    inCode = false
    codeLang = undefined
    codeBuffer = []
  }

  let paragraph: string[] = []

  for (const raw of lines) {
    const line = raw.replace(/\r$/, '')
    const fence = /^```(.*)$/.exec(line)
    if (fence) {
      if (inCode) {
        flushParagraph(paragraph); paragraph = []
        flushCode()
      } else {
        flushParagraph(paragraph); paragraph = []
        inCode = true
        codeLang = fence[1]?.trim() || undefined
      }
      continue
    }

    if (inCode) {
      codeBuffer.push(raw)
      continue
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line)
    if (heading) {
      flushParagraph(paragraph); paragraph = []
      const depth = heading[1].length
      const text = heading[2].trim()
      const id = slugify(text)
      html.push(`<h${depth} id="${id}">${escapeHtml(text)}</h${depth}>`)
      continue
    }

    if (/^\s*$/.test(line)) {
      flushParagraph(paragraph)
      paragraph = []
    } else {
      paragraph.push(line)
    }
  }

  // flush any remaining
  flushParagraph(paragraph)
  flushCode()
  return html.join('\n')
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
