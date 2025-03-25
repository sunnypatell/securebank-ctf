import { NextResponse } from 'next/server';
import db from '../../../database/db';
import { cookies } from "next/headers";

// GET all users
export async function GET() {
    try {
        const users = db.prepare('SELECT * FROM Users').all();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Failed to retrieve users" }, { status: 500 });
    }
}

// POST to log in (Stores role in session)
export async function POST(req: Request) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const illegalChars = /['"%;#*\\]/g;

    if (illegalChars.test(username) || illegalChars.test(password)) {
        return NextResponse.json({ error: "Illegal characters detected, are you trying to commit an Illegal SQL Injection little Beta??" }, { status: 400 });
    }

    try {
        const query = `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}'`;
        interface User {
            username: string;
            password: string;
            role: string;
        }
        const user = db.prepare(query).get() as User;

        console.log(query);
        console.log(user);

        if (user) {
            console.log("success", query);
            
            (await
                // Store username & role in session
                cookies()).set("session", JSON.stringify({ username: user.username, role: user.role }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1-day expiration
                path: "/",
            });

            return NextResponse.json({ success: true, message: "Login successful!", user }, { status: 200 });
        } else {
            console.log("Invalid user/pass", query);
            return NextResponse.json({ error: "SQLite: Invalid username or password", user }, { status: 401 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
