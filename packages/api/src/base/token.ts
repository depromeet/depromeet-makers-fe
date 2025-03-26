'use server';

import { cookies } from 'next/headers';
import { COOKIE_KEY } from '@depromeet-makers/constant';
import Cookies from 'js-cookie';

const isClientSide = typeof window !== 'undefined';

/**
 * 인증 토큰을 쿠키와 클라이언트 환경에 저장합니다.
 *
 * @param token 저장할 인증 토큰
 * @returns 저장된 토큰
 */
export const setToken = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_KEY.ACCESS_TOKEN, token);

  if (isClientSide) {
    Cookies.set(COOKIE_KEY.ACCESS_TOKEN, token);
  }

  return token;
};

/**
 * 저장된 인증 토큰을 가져옵니다.
 * 서버 쿠키를 우선 확인하고, 없으면 클라이언트 쿠키를 확인합니다.
 *
 * @returns 저장된 토큰 또는 빈 문자열
 */
export const getToken = async () => {
  const cookieStore = await cookies();
  const serverToken = cookieStore.get(COOKIE_KEY.ACCESS_TOKEN)?.value;

  if (serverToken) return serverToken;

  if (isClientSide) {
    const clientToken = Cookies.get(COOKIE_KEY.ACCESS_TOKEN);

    if (clientToken) {
      setToken(clientToken);
      return clientToken;
    }
  }

  return '';
};

/**
 * 저장된 인증 토큰 제거
 */
export const removeToken = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_KEY.ACCESS_TOKEN);

  if (isClientSide) {
    Cookies.remove(COOKIE_KEY.ACCESS_TOKEN);
  }
};
