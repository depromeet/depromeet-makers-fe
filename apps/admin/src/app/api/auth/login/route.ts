import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const response = await fetch(`${BASE_URL}/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        passCord: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: '로그인에 실패했습니다.' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
