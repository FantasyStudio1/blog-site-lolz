import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface TextAreaProps extends ComponentProps<'textarea'> {}

export function TextArea(props: TextAreaProps) {
  const { className, ...textAreaProps } = props

  return (
    <div className='max-w-full flex relative'>
      <textarea
        className={cn(
          'w-full font-[inherit] transition-shadow text-sm border border-solid border-[#e2e2e2] bg-white h-10 rounded-md py-2 px-3 resize-none min-h-24',
          className
        )}
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        spellCheck={false}
        {...textAreaProps}
      />
    </div>
  )
}
