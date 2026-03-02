import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const protectedPaths = ['/admin/dashboard', '/admin/settings', '/admin/admins', '/admin/logs', '/admin/cars'];
  
  const isProtected = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected) {
    const session = request.cookies.get('admin-session');
    
    if (!session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/settings/:path*', '/admin/admins/:path*', '/admin/logs/:path*', '/admin/cars/:path*'],
};
