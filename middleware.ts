import { NextRequest, NextResponse } from 'next/server';
import { verifyJwt } from './lib/jwt';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Token yoksa giriş sayfasına yönlendir
  if (!token || !verifyJwt(token)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Hangi route'larda çalışsın?
export const config = {
  matcher: [
    '/dashboard',
    '/survey/:path*', // örnek: /survey/create, /survey/123
    '/profile',       // örnek: profil tamamlama sayfası da korumalı olabilir
  ],
};
