import { fetcher } from '@/lib/data/api'
import { IPostItem } from '@/lib/types'

export async function getSinglePost(id: string): Promise<IPostItem | undefined> {
  try {
    return await fetcher({
      endpoint: `/posts/single?id=${id}`,
      cache: 'no-cache'
    })
  } catch (e) {
    return undefined
  }
}
