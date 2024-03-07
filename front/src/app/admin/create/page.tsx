import { Metadata } from 'next'

import Form from './form'

export const metadata: Metadata = {
  title: 'Создать пост'
}

export default function Page() {
  return (
    <div>
      <h1 className='text-2xl font-medium text-center py-4'>Создать пост</h1>
      <Form />
    </div>
  )
}
