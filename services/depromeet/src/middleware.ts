import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { COOKIE_KEY } from './constants/cookie';
import { postAuthRefresh } from './hooks/apis/auth/useAuthRefresh';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const redirect = NextResponse.redirect(new URL('/login', request.url));

  const accessToken = request.cookies.get(COOKIE_KEY.ACCESS_TOKEN);
  const refreshToken = request.cookies.get(COOKIE_KEY.REFRESH_TOKEN);

  if (!accessToken && !refreshToken) return redirect;
  if (!accessToken && refreshToken) {
    try {
      const responseToken = await postAuthRefresh({ refreshToken: refreshToken.value });

      response.cookies.set(COOKIE_KEY.ACCESS_TOKEN, responseToken.accessToken);
      response.cookies.set(COOKIE_KEY.REFRESH_TOKEN, responseToken.refreshToken);

      return response;
    } catch (error) {
      return redirect;
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
