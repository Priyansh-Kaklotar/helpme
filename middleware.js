// import { NextResponse } from 'next/server';

// const protectedRoutes = ['/', '/about'];

// export function middleware(request) {
//   // console.log('Middleware hit:', pathname);

//   // const { pathname } = request.nextUrl;
//   // const token = request.cookies.get('access_token')?.value;

//   // const isProtected = protectedRoutes.includes(pathname);

//   // if (isProtected && !token) {
//   //   return NextResponse.redirect(new URL('/login', request.url));
//   // }

//   // return NextResponse.next();
//   return NextResponse.redirect(new URL('/login', request.url));
// }

// export const config = {
//     matcher: ['/((?!api|_next|.*\\..*|login).*)'],

// };


import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('✅ Middleware triggered at', request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/about', '/((?!_next|api|.*\\..*).*)'],
};
