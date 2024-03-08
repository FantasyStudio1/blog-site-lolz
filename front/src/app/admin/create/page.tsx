import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/data/auth'

import Form from './form'

export const metadata: Metadata = {
  title: 'Создать пост'
}

export default async function Page() {
  const user = await getCurrentUser()
  if (!user.isAdmin) redirect('/admin')

  return (
    <div>
      <h1 className='text-2xl font-medium text-center py-4'>Создать пост</h1>
      <Form />
    </div>
  )
}
