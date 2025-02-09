import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { COOKIE_KEY } from '@/constants/cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const generation = searchParams.get('generation');

    const accessToken = cookies().get(COOKIE_KEY.ACCESS_TOKEN);

    const response = await fetch(`${BASE_URL}/v1/attendances/me`, {
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
      ...(generation && {
        params: { generation },
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: '출석 정보를 가져오는데 실패했습니다.' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Attendance API Error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
