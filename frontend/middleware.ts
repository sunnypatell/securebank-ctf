import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// @ts-ignore
import * as cookieSignature from "cookie-signature";

export async function middleware(req: Request) {
  const sessionCookie = req.headers.get("cookie")?.split("; ").find((c) => c.startsWith("session="))?.split("=")[1];

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const secret = process.env.COOKIE_SECRET!;
  const unsigned = cookieSignature.unsign(sessionCookie, secret);

  if (!unsigned) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const session = JSON.parse(unsigned);

  if (!session || !session.username) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to /dashboard and its subpaths
};