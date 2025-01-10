import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middelware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow unrestricted access to public routes
  if (['/login', '/register', '/auth', '/api/auth/callback'].some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Restrict access to protected routes
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
