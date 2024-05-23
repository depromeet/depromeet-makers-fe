import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { STORAGE_KEY } from './constants/storage';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(STORAGE_KEY.ACCESS_TOKEN);

  return token ? NextResponse.next() : NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!login).*)'],
};
