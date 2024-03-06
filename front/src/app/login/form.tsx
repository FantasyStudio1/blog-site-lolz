'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { Button } from '@/components/button'
import { Error } from '@/components/error'
import { FormField } from '@/components/form-field'
import { Input } from '@/components/input'

import { loginAction } from '@/lib/data/actions'

export function Form() {
  const [state, formAction] = useFormState(loginAction, null)

  return (
    <form action={e => formAction(e)} className='max-w-96 mx-auto w-full flex flex-col gap-4'>
      <FormField title='E-mail'>
        <Input
          type='email'
          autoComplete='email'
          name='email'
          required
          placeholder='mike@gmail.com'
        />
      </FormField>
      <FormField title='Пароль'>
        <Input type='password' name='password' placeholder='••••••••' />
      </FormField>
      {state ? <Error>{state}</Error> : null}
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button isLoading={pending} type='submit'>
      Войти
    </Button>
  )
}
