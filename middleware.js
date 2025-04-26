import { NextResponse } from 'next/server';

export function middleware(req) {
  const user = req.cookies.get('user');
  const isAuthPage = req.nextUrl.pathname === '/auth';

  if (!user && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile', '/admin/:path*', '/auth']
};