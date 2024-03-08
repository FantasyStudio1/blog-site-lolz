'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { fetcher } from '@/lib/data/api'
import { getCurrentUser } from '@/lib/data/auth'
import { getSinglePost } from '@/lib/data/posts'
import { IPostItem } from '@/lib/types'
import { isErrorWithStatus } from '@/lib/utils'

export async function loginAction(_: any, formData: FormData) {
  const body = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  try {
    const data = await fetcher<{ accessToken: string }>({
      endpoint: '/auth/login',
      method: 'POST',
      body: JSON.stringify(body)
    })

    const date = new Date()

    cookies().set('token', data.accessToken, {
      domain: 'localhost',
      path: '/',
      expires: date.setDate(date.getDate() + 1),
      sameSite: 'lax',
      secure: true,
      httpOnly: true
    })
  } catch (e) {
    if (isErrorWithStatus(e)) {
      if (e.status === 400) {
        return 'Неправильный пароль или почта'
      } else {
        return 'Возникла непредвиденная ошибка'
      }
    }

    return 'Возникла непредвиденная ошибка'
  }

  redirect('/admin')
}

export async function createCommentAction(_: any, formData: FormData) {
  // Добавлять комментарии могут все, поэтому не проверяем авторизацию

  const postId = formData.get('postId') as string

  if (!postId || isNaN(Number(postId))) throw new Error('Wrong Post Id')

  const post = await getSinglePost(postId)

  if (!post) throw new Error('No such post')

  const body = {
    postId: Number(postId),
    author: formData.get('author'),
    text: formData.get('message')
  }

  try {
    await fetcher({
      endpoint: '/posts/comment',
      method: 'POST',
      body: JSON.stringify(body)
    })

    revalidatePath(`/post/${postId}`)

    return {
      success: true
    }
  } catch (e) {
    throw e
  }
}

export async function createPostAction(_: any, formData: FormData) {
  const user = await getCurrentUser()

  if (user.email === null) throw new Error('Unauthorized')
  if (!user.isAdmin) throw new Error('No permission')

  const body = {
    title: formData.get('title'),
    description: formData.get('description'),
    content: formData.get('content')
  }

  try {
    const res = await fetcher<Omit<IPostItem, 'comments'>>({
      endpoint: '/posts/create',
      method: 'POST',
      body: JSON.stringify(body)
    })

    redirect(`/post/${res.id}`)
  } catch (e) {
    throw e
  }
}

export async function deletePostAction(_: any, formData: FormData) {
  const user = await getCurrentUser()

  if (user.email === null) throw new Error('Unauthorized')
  if (!user.isAdmin) throw new Error('No permission')

  const postId = formData.get('postId') as string

  if (!postId || isNaN(Number(postId))) throw new Error('Wrong Post Id')

  const post = await getSinglePost(postId)

  if (!post) throw new Error('No such post')

  try {
    await fetcher({
      endpoint: `/posts/delete?id=${postId}`,
      method: 'DELETE'
    })

    return {
      success: true
    }
  } catch (e) {
    throw e
  }
}

export async function editPostAction(_: any, formData: FormData) {
  const user = await getCurrentUser()

  if (user.email === null) throw new Error('Unauthorized')
  if (!user.isAdmin) throw new Error('No permission')

  const postId = formData.get('postId') as string

  if (!postId || isNaN(Number(postId))) throw new Error('Wrong Post Id')

  const post = await getSinglePost(postId)

  if (!post) throw new Error('No such post')

  const body = {
    id: Number(postId),
    title: formData.get('title'),
    description: formData.get('description'),
    content: formData.get('content')
  }

  try {
    await fetcher({
      endpoint: '/posts/edit',
      method: 'PUT',
      body: JSON.stringify(body)
    })

    redirect(`/post/${postId}`)
  } catch (e) {
    throw e
  }
}
