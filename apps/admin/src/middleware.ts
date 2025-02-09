import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { COOKIE_KEY } from './constants/cookie';
import { postAuthRefresh } from './hooks/apis/auth/postAuthRefresh';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const redirect = NextResponse.redirect(new URL('/login', request.url));

  const accessToken = request.cookies.get(COOKIE_KEY.ACCESS_TOKEN);
  const refreshToken = request.cookies.get(COOKIE_KEY.REFRESH_TOKEN);
  const currentRole = request.cookies.get(COOKIE_KEY.CURRENT_ROLE);

  if (!accessToken || !refreshToken || !currentRole) return redirect;

  if (!accessToken && refreshToken && currentRole) {
    try {
      const responseToken = await postAuthRefresh({ refreshToken: refreshToken.value });

      response.cookies.set(COOKIE_KEY.ACCESS_TOKEN, responseToken.accessToken);
      response.cookies.set(COOKIE_KEY.REFRESH_TOKEN, responseToken.refreshToken);
      response.cookies.set(COOKIE_KEY.CURRENT_ROLE, currentRole.value);

      return response;
    } catch (error) {
      return redirect;
    }
  }

  const isLoginPath = request.nextUrl.pathname.startsWith('/login');

  if (isLoginPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
