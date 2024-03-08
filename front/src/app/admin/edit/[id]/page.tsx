import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/data/auth'
import { getSinglePost } from '@/lib/data/posts'

import { Form } from './form'

type PageProps = {
  params: { id: string }
}

export const metadata: Metadata = {
  title: 'Редактировать пост'
}

export default async function Page({ params: { id } }: PageProps) {
  const user = await getCurrentUser()
  if (!user.isAdmin) redirect('/admin')

  const post = await getSinglePost(id)
  if (!post) notFound()

  return (
    <div>
      <h1 className='text-2xl font-medium text-center py-4'>Редактировать</h1>
      <Form title={post.title} desc={post.description} content={post.content} id={post.id} />
    </div>
  )
}
