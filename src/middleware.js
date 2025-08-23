import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/customer/find-provider' , '/customer/dashboard']; // haji add karsu extra kem ke home page koi pan joi shake pan amuk route mate login ke registeration thavu pade atyare / rakhyu chhe pan pachhi booking , ke biju kak rakhshu . 

export async function middleware(request) {
  const  pathname  = request.nextUrl.pathname;
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if((pathname.startsWith('/api') || pathname.startsWith('/auth')) && request.headers.get("sec-fetch-dest") === "document"){
    return new NextResponse("Forbiddon" , {status:403});
  }

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
  matcher: [
    '/api/:path*',
    '/auth/:path*',
    '/customer/:path*',
  ],
};