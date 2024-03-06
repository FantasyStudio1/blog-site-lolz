import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface FormFieldProps {
  children: ReactNode
  title: string
  className?: string
}

export function FormField({ children, title, className }: FormFieldProps) {
  return (
    <div className={cn('inline-block', className)}>
      <div className='text-sm mb-1 text-[#6f6f6f]'>{title}</div>
      <div>{children}</div>
    </div>
  )
}
