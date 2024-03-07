import { Posts } from '@/app/posts'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Главная'
}

export default async function Home() {
  return (
    <div>
      <h1 className='text-2xl font-medium text-center py-4'>Home Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Posts />
      </Suspense>
    </div>
  )
}
