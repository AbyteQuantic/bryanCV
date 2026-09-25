import { NextResponse } from 'next/server';

/* Solo filtra por formato; la firma y la expiración se validan en /api/admin/metrics. */
const SESSION_FORMAT = /^\d{10,16}\.[a-f0-9]{64}$/;

export function middleware(request) {
  const token = request.cookies.get('admin_session')?.value;
  if (!token || !SESSION_FORMAT.test(token)) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin'],
};
