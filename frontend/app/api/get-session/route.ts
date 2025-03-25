import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const userSession = (await cookies()).get("session");

    if (!userSession) {
        return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    try {
        const user = JSON.parse(userSession.value);
        return NextResponse.json({ username: user.username });
    } catch (error) {
        return NextResponse.json({ error: "Invalid session data" }, { status: 500 });
    }
}
