import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middelware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow unrestricted access to public routes
  if (['/login', '/register', '/api/auth/callback'].some(route => pathname.startsWith(route))) {
    console.log('[Middleware] Public route accessed:', pathname);
    return NextResponse.next();
  }

  console.log('[Middleware] Protected route accessed:', pathname);

  // Update session for protected routes
  const response = await updateSession(request);

  // Ensure the response includes cookies for session persistence
  if (!response.cookies.has('supabase-auth-token')) {
    console.log('[Middleware] No session token found, redirecting to /login...');
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  return response;
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
