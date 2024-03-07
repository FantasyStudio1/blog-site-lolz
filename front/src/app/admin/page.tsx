import { Posts } from '@/app/posts'
import Link from 'next/link'
import { Suspense } from 'react'

import { getCurrentUser } from '@/lib/data/auth'

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Welcome />
      </Suspense>
    </div>
  )
}

async function Welcome() {
  const user = await getCurrentUser()

  return (
    <div>
      <div className='text-lg mb-4'>
        Добро пожаловать <span className='font-medium'>{user.email}</span>
      </div>
      {user.isAdmin ? (
        <div>
          <Link
            className='mb-2 inline-flex justify-center items-center gap-3 px-3 bg-white text-[#171717] transition-shadow cursor-pointer font-medium text-sm select-none h-9 rounded-md border border-solid border-[rgba(0,0,0,.114)] shadow-sm hover:shadow'
            href={'/admin/create'}
          >
            Создать пост
          </Link>
          <Suspense fallback={<div>Loading...</div>}>
            <Posts admin />
          </Suspense>
        </div>
      ) : (
        <div>Управлять постами может только пользователь с правами администратора</div>
      )}
    </div>
  )
}
