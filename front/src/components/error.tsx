import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function Error({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('text-red-500 text-sm', className)} role='alert' aria-atomic>
      {children}
    </div>
  )
}
