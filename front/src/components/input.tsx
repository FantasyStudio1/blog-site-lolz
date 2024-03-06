import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends ComponentProps<'input'> {}

export function Input(props: InputProps) {
  const { type = 'text', className, ...inputProps } = props

  return (
    <div className='max-w-full flex relative'>
      <input
        className={cn(
          'w-full font-[inherit] transition-shadow text-sm border border-solid border-[#e2e2e2] bg-white h-10 rounded-md px-3',
          className
        )}
        type={type}
        autoCapitalize='none'
        autoComplete='off'
        autoCorrect='off'
        spellCheck={false}
        {...inputProps}
      />
    </div>
  )
}
