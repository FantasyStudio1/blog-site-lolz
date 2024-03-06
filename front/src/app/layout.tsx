import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

import { Header } from '@/components/header'

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
    <html lang='en' className={cn(sans.variable, 'antialiased bg-[#FCFCFC]')}>
      <body className='font-sans'>
        <Header />
        <main className='max-w-[calc(768px+16px*2)] mx-auto px-4 w-full'>{children}</main>
      </body>
    </html>
  )
}
