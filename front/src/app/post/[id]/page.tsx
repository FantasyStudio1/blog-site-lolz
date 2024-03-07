import { notFound } from 'next/navigation'

import { Comment } from '@/components/comment'

import { getSinglePost } from '@/lib/data/posts'

import { Form } from './form'

type PageProps = {
  params: { id: string }
}

export default async function Page({ params: { id } }: PageProps) {
  const post = await getSinglePost(id)

  if (!post) notFound()

  return (
    <div>
      <h1 className='text-lg font-medium text-center text-balance mb-3'>{post.title}</h1>
      <div className='text-gray-600 mb-6'>{post.description}</div>
      <p className='mb-6'>{post.content}</p>

      <div>
        <Form id={id} />
        {post.comments.length ? (
          <div>
            <div className='font-medium mb-3'>Комментарии:</div>
            <div className='flex flex-col gap-3'>
              {post.comments.map(comment => (
                <Comment item={comment} key={comment.id} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
