import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies();

  // Remove the session cookie by setting an expired one
  (await
        cookieStore).set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0), // Expire immediately
    path: '/',
  });

  return NextResponse.json({ success: true, message: 'Logged out' });
}
