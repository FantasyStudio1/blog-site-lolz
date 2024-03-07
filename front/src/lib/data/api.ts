import { cookies } from 'next/headers'

import { apiDomain } from '@/lib/constants'

export async function fetcher<T>({
  endpoint,
  method = 'GET',
  cache = 'force-cache',
  body,
  headers,
  tags
}: {
  endpoint: string
  method?: string
  body?: BodyInit
  cache?: RequestCache
  headers?: HeadersInit
  tags?: string[]
}): Promise<T> {
  const res = await fetch(`${apiDomain}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookies().toString(),
      ...headers
    },
    body,
    cache,
    ...(tags && { next: { tags } })
  })

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}
