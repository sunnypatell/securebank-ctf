import { NextResponse } from 'next/server';
import db from '../../../database/db';
import { cookies } from "next/headers";

// @ts-ignore
import * as cookieSignature from 'cookie-signature';


// GET all users
export async function GET() {
    try {
        const users = db.prepare('SELECT * FROM Users').all();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Failed to retrieve users" }, { status: 500 });
    }
}

type User = {
    username: string;
    password: string;
    role: string;
  };  

// POST to log in (Stores role in session)
export async function POST(req: Request) {
    const payload = await req.text();

    const params = new URLSearchParams(payload);

    const username = params.get('username') || '';
    const password = params.get('password') || '';
    const illegalChars = /['";#=\-*\\]/g;  
    
    if (illegalChars.test(username) || illegalChars.test(password)) { // this will catch a single encoded payload because of automatic decoding, must use double encoding to get passed this 
        console.log("username")
        console.log("password")
        // the trick here is % is not filtered in illegalchars
        return NextResponse.json({ error: "Illegal characters detected, are you trying to commit an Illegal SQL Injection??" }, { status: 400 });
    }
    if (!username || !password) {

        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }


    function decode(str:string){
        return decodeURIComponent(decodeURIComponent(str)) // enable double decoding
    }
    /*
    
    */

    const decodedUsername = decode(username);
    const decodedPass = decode(password)

   
    try {
        const query = `SELECT * FROM Users WHERE username = '${decodedUsername}' AND password = '${decodedPass}'`;
        console.log("query: " + query)
        const user = db.prepare(query).get() as User;
        
        // log in as first user username=dosentmatter%2527%2520OR%25201%253D1%2520%252F%252A&password=ggIWIN
        

        if (user) {
            console.log("success", query);
            
            // (await
            //     // Store username & role in session
            //     cookies()).set("session", JSON.stringify({ username: user.username, role: user.role }), {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === "production",
            //     sameSite: "strict",
            //     maxAge: 60 * 60 * 24, // 1-day expiration
            //     path: "/",
            // });

            const sessionData = JSON.stringify({ username: decodedUsername, role: user.role });
            const secret = process.env.COOKIE_SECRET!;
            const signedSession = cookieSignature.sign(sessionData, secret);

            //const signedSession = cookieSignature.sign(sessionData, 'p9Y!2m@lK8z$1WqA7&dE4Xu0Cj');

            (await cookies()).set("session", signedSession, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24,
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
