'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { Button } from '@/components/button'
import { FormField } from '@/components/form-field'
import { Input } from '@/components/input'
import { TextArea } from '@/components/text-area'

import { createCommentAction } from '@/lib/data/actions'

export function Form({ id }: { id: string }) {
  const [state, formAction] = useFormState(createCommentAction, null)

  useEffect(() => {
    const authorInput = document.querySelector("[name='author']") as HTMLInputElement
    const textArea = document.querySelector("[name='message']") as HTMLTextAreaElement

    if (state) {
      if (state.success) {
        if (authorInput) {
          authorInput.value = ''
        }

        if (textArea) {
          textArea.value = ''
        }
      }
    }
  }, [state])

  return (
    <form name='form' action={e => formAction(e)} className='flex flex-col gap-2 mb-5'>
      <FormField title='Имя'>
        <Input required name='author' />
      </FormField>
      <FormField title='Сообщение'>
        <TextArea required name='message' />
      </FormField>
      <input type='hidden' name='postId' value={id} />
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' isLoading={pending}>
      Добавить комментарий
    </Button>
  )
}
