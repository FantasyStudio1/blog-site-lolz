import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { cn } from '@/lib/utils'

import '@/styles/globals.css'

const sans = Open_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--sans-font'
})

export const metadata: Metadata = {
  title: 'Blog Site',
  description: 'Find interesting posts about everything'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={cn(sans.variable, 'antialiased')}>
      <body className='font-sans'>{children}</body>
    </html>
  )
}
