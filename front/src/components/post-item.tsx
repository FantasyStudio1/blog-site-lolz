import Link from 'next/link'

import { IPostItem } from '@/lib/types'

export function PostItem({ post }: { post: IPostItem }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className='border border-solid border-[rgba(0,0,0,.114)] p-3 rounded-md shadow-sm hover:shadow transition-shadow'
    >
      <div className='font-medium text-base'>{post.title}</div>
      <div className='text-sm line-clamp-1 has-[+div]:mb-3'>{post.description}</div>
      {post.comments.length ? <div className='text-xs'>Есть комментарии</div> : null}
    </Link>
  )
}
