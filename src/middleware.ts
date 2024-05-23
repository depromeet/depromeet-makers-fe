import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { COOKIE_KEY } from './constants/cookie';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_KEY.ACCESS_TOKEN);

  return token ? NextResponse.next() : NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!login).*)'],
};
