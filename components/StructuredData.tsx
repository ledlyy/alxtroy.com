import { headers } from 'next/headers'

type StructuredDataProps = {
  data: unknown
}

export async function StructuredData({ data }: StructuredDataProps) {
  const headerList = await headers()
  const nonce = headerList.get('x-nonce') ?? undefined

  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
