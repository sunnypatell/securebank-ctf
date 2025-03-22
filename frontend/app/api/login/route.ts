import { NextResponse } from "next/server";
import db from "../../../database/db";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        const query = `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}'`;
        const user = db.prepare(query).get();

        if (user) {
            return NextResponse.json({ success: true, message: "Login successful!", user });
        } else {
            return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Error during login" }, { status: 500 });
    }
}