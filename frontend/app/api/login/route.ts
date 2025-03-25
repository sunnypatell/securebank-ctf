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

// POST to log in
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
        }
        const user = db.prepare(query).get() as User;
        console.log(query);
        console.log(user);

        if (user) {
            console.log("success", query)
            const userSession = { username: user.username };
            
            // Set a session cookie
            (await
                // Set a session cookie
                cookies()).set("session", JSON.stringify(userSession), {
                httpOnly: true, // Prevents JavaScript access
                secure: process.env.NODE_ENV === "production", // Secure in production
                sameSite: "strict", // Protects against CSRF
                maxAge: 60 * 60 * 24, // 1 day expiration
                path: "/",
            });
            return NextResponse.json({ success: true, message: "Login successful!", user }, {status: 200});
        } else {
            console.log("Invalid user/pass", query)
            return NextResponse.json({error: "SQlite: Invalid username or password", user}, { status: 401 });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
