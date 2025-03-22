import { NextResponse } from "next/server";
import db from "../../../database/db";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    if (!username || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    try {
        const query = `INSERT INTO Users (username, password, role) VALUES ('${username}', '${password}', 'user')`;
        db.prepare(query).run();
        return NextResponse.json({ success: true, message: "User registered!" });
    } catch (error) {
        return NextResponse.json({ error: "Error registering user" }, { status: 500 });
    }
}
