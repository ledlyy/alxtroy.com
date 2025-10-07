import { draftMode } from 'next/headers'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const disable = searchParams.get('disable')
  if (disable) {
    const dm = await draftMode()
    dm.disable()
    return new Response('Preview disabled', { status: 200 })
  }
  const secret = searchParams.get('secret')
  if (!secret || secret !== (process.env.PREVIEW_SECRET || 'dev-secret')) {
    return new Response('Unauthorized', { status: 401 })
  }
  const dm = await draftMode()
  dm.enable()
  return new Response('Preview enabled', { status: 200 })
}
