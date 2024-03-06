import { NextRequest, NextResponse } from 'next/server'

import { getCurrentUser } from '@/lib/data/auth'

export async function middleware(request: NextRequest) {
  const [, segment] = request.nextUrl.pathname.split('/')

  const user = await getCurrentUser()

  if (user.email === null && segment === 'admin') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user.email !== null && segment === 'login') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
