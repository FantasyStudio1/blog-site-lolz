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
    <div className='text-lg'>
      Добро пожаловать <span className='font-medium'>{user.email}</span>
    </div>
  )
}
