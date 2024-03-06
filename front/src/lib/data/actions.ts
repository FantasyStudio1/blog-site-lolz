'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { fetcher } from '@/lib/data/api'
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
