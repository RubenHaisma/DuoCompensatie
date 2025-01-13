import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/utils/supabase/middelware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  const publicRoutes = ['/login', '/register', '/', '/terms', '/privacy'];
  const isPublicRoute = publicRoutes.includes(pathname);

  if (isPublicRoute || pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  try {
    const { response, supabase } = await updateSession(request);
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      const redirectUrl = new URL('/login', request.url);
      redirectUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Prevent loop for /dashboard/setup
    if (pathname === '/dashboard/setup') {
      return response;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', session.user.id)
      .single();

    if (!profile?.full_name) {
      const redirectUrl = new URL('/dashboard/setup', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch (err) {
    console.error('Middleware Error:', err);
    const redirectUrl = new URL('/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
