import { cookies } from 'next/headers'

import { fetcher } from '@/lib/data/api'
import { User } from '@/lib/types'

export const getCurrentUser = async () => {
  return await fetcher<User>({
    endpoint: '/auth/validate',
    headers: {
      Cookie: cookies().toString()
    },
    cache: 'no-cache'
  })
}
