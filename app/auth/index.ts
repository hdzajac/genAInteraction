import { StartAPIHandlerCallback } from '@tanstack/start/api'
import { getHeaders } from 'vinxi/http'

export const token = process.env.AUTH_TOKEN
export const password = process.env.AUTH_PASSWORD

type CTX = {
  request: Request
  params: Record<never, string>
}

export async function authMiddleware(ctx: CTX, cb: StartAPIHandlerCallback): Promise<Response> {
  const headers = getHeaders()

  // Disable auth for local development
  if (headers.host?.includes('localhost')) {
    return cb(ctx)
  }

  return new Promise(async (resolve) => {
    const auth = ctx.request.headers.get('authorization')

    if (auth !== token) {
      resolve(
        new Response('Unauthorized', {
          status: 401,
        }),
      )
    }

    const res = await cb(ctx)

    resolve(res)
  })
}
