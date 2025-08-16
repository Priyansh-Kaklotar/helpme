import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/find-provider']; // haji add karsu extra kem ke home page koi pan joi shake pan amuk route mate login ke registeration thavu pade atyare / rakhyu chhe pan pachhi booking , ke biju kak rakhshu . 

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  const isProtected = protectedRoutes.includes(pathname);
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login/customer', request.url));
  }
  if (pathname === 'find-provider' && !token) {
    const userType = (await cookieStore).get("userType")?.value;
    if (userType === 'provider') {
      return NextResponse.redirect(new URL('/', request.url)); // no access page in future
    } else if (userType === undefined) {
      console.log('this was through Find-provider middleware');
      return NextResponse.redirect(new URL('/login/customer', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
