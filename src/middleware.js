import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  /* Only protect /admin (not /admin/login or /api/admin/auth) */
  if (pathname === '/admin') {
    const token = request.cookies.get('admin_session')?.value;

    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    /* Validate token structure */
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      if (!decoded.includes(':')) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin'],
};
