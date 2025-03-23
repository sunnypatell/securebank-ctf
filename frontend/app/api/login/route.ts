import { NextResponse } from 'next/server';
import db from '../../../database/db'; 

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

    try {
        const query = `SELECT * FROM Users WHERE username = '${username}' AND password = '${password}'`;
        const user = db.prepare(query).get();
        console.log(query);
        console.log(user);

        if (user) {
            return NextResponse.json({ success: true, message: "Login successful!", user });
        } else {
            return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Error during login" }, { status: 500 });
    }
}




// PUT to register a new user
export async function PUT(req: Request) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const query = `INSERT INTO Users (username, password, role) VALUES ('${username}', '${password}', 'user')`;

        try {
            const result = db.prepare(query).run();
            return NextResponse.json({ success: true, userId: result.lastInsertRowid });
        } catch (error) {
            return NextResponse.json({ error: "An error occurred while adding the user" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Invalid request data" }, { status: 500 });
    }
}
