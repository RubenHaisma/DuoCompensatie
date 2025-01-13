import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middelware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow unrestricted access to public routes and static files
  if (
    pathname.startsWith('/_next') || // Next.js system files
    pathname.startsWith('/api/') || // API routes
    pathname.startsWith('/static/') || // Static files
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/' ||
    pathname === '/terms' ||
    pathname === '/privacy'
  ) {
    return NextResponse.next();
  }

  // Update session
  const response = await updateSession(request);
  const { supabase } = await response.json();
  const supabaseClient = supabase;

  if (!supabaseClient) {
    // If no session, redirect to login
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Continue with the response if authenticated
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};