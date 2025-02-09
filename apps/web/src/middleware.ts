import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { CURRENT_GENERATION } from './constants/attendance';
import { COOKIE_KEY } from './constants/cookie';
import { postAuthRefresh } from './hooks/apis/auth/useAuthRefresh';
import type { GetInfoResponse } from './hooks/apis/user/useGetInfo';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const redirect = NextResponse.redirect(new URL('/login', request.url));

  const accessToken = request.cookies.get(COOKIE_KEY.ACCESS_TOKEN);
  const refreshToken = request.cookies.get(COOKIE_KEY.REFRESH_TOKEN);
  const currentRole = request.cookies.get(COOKIE_KEY.CURRENT_ROLE);

  if (!accessToken && !refreshToken) return redirect;

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

  const isAdmin = await checkIsAdmin(accessToken?.value || '');
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminPath && !isAdmin) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isAdminPath && isAdmin) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return response;
}

const checkIsAdmin = async (accessToken: string) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data: GetInfoResponse = await res.json();

    const generationData = data.generations.find((gen) => gen.generationId === CURRENT_GENERATION);
    if (!generationData) return false;

    return generationData.role === 'ORGANIZER';
  } catch (error) {
    return false;
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login).*)'],
};
