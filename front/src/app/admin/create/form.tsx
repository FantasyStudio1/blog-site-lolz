'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { Button } from '@/components/button'
import { FormField } from '@/components/form-field'
import { Input } from '@/components/input'
import { TextArea } from '@/components/text-area'

import { createPostAction } from '@/lib/data/actions'

export default function Form() {
  const [, formAction] = useFormState(createPostAction, null)

  return (
    <form className='flex flex-col gap-4' action={e => formAction(e)}>
      <FormField title='Название'>
        <Input name='title' required />
      </FormField>
      <FormField title='Описание'>
        <Input name='description' required />
      </FormField>
      <FormField title='Текст поста'>
        <TextArea name='content' required />
      </FormField>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' isLoading={pending}>
      Создать
    </Button>
  )
}
