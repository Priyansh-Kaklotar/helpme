import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/abc']; // haji add karsu extra kem ke home page koi pan joi shake pan amuk route mate login ke registeration thavu pade atyare / rakhyu chhe pan pachhi booking , ke biju kak rakhshu . 

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const isProtected = protectedRoutes.includes(pathname);
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();

}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
