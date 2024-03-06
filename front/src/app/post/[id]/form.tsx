'use client'

import { Button } from '@/components/button'
import { FormField } from '@/components/form-field'
import { Input } from '@/components/input'
import { TextArea } from '@/components/text-area'

export function Form() {
  return (
    <form className='flex flex-col gap-2 mb-5'>
      <FormField title='Имя'>
        <Input required name='name' />
      </FormField>
      <FormField title='Сообщение'>
        <TextArea required name='message' />
      </FormField>
      <Button type='submit'>Добавить комментарий</Button>
    </form>
  )
}
