import type { Metadata } from 'next'

import { Form } from './form'

export const metadata: Metadata = {
  title: 'Вход'
}

export default function Page() {
  return (
    <div>
      <h1 className='text-center font-medium text-xl mb-8'>Войти в аккаунт</h1>

      <Form />
    </div>
  )
}
