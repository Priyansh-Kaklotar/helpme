// middleware.js
import { NextResponse } from 'next/server';

const protectedRoutes = ['/' , '/about'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token');

  const isProtected = protectedRoutes.includes(pathname);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/about'],
};
