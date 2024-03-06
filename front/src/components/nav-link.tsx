'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

interface NavLinkProps {
  children: React.ReactNode
  href: string
}

export function NavLink({ href, children }: NavLinkProps) {
  const segment = useSelectedLayoutSegment()
  const path = !segment ? '' : segment
  const isActive = path === href.replace('/', '')

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className='rounded-sm text-slate-800 transition-colors hover:text-black focus-visible:transition-none aria-[current=page]:underline aria-[current=page]:underline-offset-4 aria-[current=page]:decoration-1 aria-[current=page]:text-black'
    >
      {children}
    </Link>
  )
}
