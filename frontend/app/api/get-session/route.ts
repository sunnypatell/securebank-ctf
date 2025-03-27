import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
// @ts-ignore
import * as cookieSignature from 'cookie-signature';

export async function GET() {
  const sessionCookie = (await cookies()).get("session")?.value;

  if (!sessionCookie) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  const secret = process.env.COOKIE_SECRET!;
  const unsigned = cookieSignature.unsign(sessionCookie, secret);

  if (!unsigned) {
    return NextResponse.json({ error: "Invalid session" }, { status: 403 });
  }

  const session = JSON.parse(unsigned);
  return NextResponse.json({ username: session.username, role: session.role }, { status: 200 });
}
