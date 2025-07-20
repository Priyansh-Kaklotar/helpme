// import { NextResponse } from 'next/server';
// // import { NextResponse } from 'next/server';

// const protectedRoutes = ['/' , '/about'];
// // const protectedRoutes = ['/', '/about'];

// export function middleware(request) {
//   const { pathname } = request.nextUrl;
//   const token = request.cookies.get('access_token');
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

//   const isProtected = protectedRoutes.includes(pathname);
// // export const config = {
// //     matcher: ['/((?!api|_next|.*\\..*|login).*)'],

//   if (isProtected && !token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
// // };

// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   console.log('✅ Middleware triggered at', request.nextUrl.pathname);
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/', '/about'],
//   matcher: ['/', '/about', '/((?!_next|api|.*\\..*).*)'],
// };

// // middleware.js
// // import { NextResponse } from "next/server";

// // const protectedRoutes = ["/", "/about"];

// // export function middleware(request) {
// //   const { pathname } = request.nextUrl;
// //   const token = request.cookies.get("access_token");

// //   const isProtected = protectedRoutes.includes(pathname);

// //   if (isProtected && !token) {
// //     return NextResponse.redirect(new URL("/login", request.url));
// //   }

// //   return NextResponse.next();
// // }
// // export const config = {
// //   matcher: ["/", "/about"],
// // };

import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("✅ Middleware triggered at", request.nextUrl.pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/about", "/((?!_next|api|.*\\..*).*)"],
};
