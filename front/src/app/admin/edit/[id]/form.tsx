'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { Button } from '@/components/button'
import { FormField } from '@/components/form-field'
import { Input } from '@/components/input'
import { TextArea } from '@/components/text-area'

import { editPostAction } from '@/lib/data/actions'

interface FormProps {
  title: string
  desc: string
  content: string
  id: string
}

export function Form({ title, desc, content, id }: FormProps) {
  const [, formAction] = useFormState(editPostAction, null)

  return (
    <form className='flex flex-col gap-4' action={e => formAction(e)}>
      <FormField title='Название'>
        <Input defaultValue={title} name='title' required />
      </FormField>
      <FormField title='Описание'>
        <Input defaultValue={desc} name='description' required />
      </FormField>
      <FormField title='Текст поста'>
        <TextArea defaultValue={content} name='content' required />
      </FormField>
      <input type='hidden' value={id} name='postId' />
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' isLoading={pending}>
      Сохранить
    </Button>
  )
}
