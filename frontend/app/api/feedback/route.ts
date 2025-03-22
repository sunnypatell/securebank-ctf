import { NextResponse } from "next/server";
import db from "../../../database/db"; // Ensure correct path

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log("Received Data:", body); // Debugging

        const { user, message } = body;

        if (!user || !message) {
            console.error("Missing fields:", { user, message });
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Vulnerable SQL Injection Query
        const query = `INSERT INTO Comments (commenter, recipient, feedback) VALUES ('${user}', 'admin', '${message}')`;

        console.log("Executing Query:", query); // Debugging
        db.prepare(query).run();

        return NextResponse.json({ success: true, message: "Feedback submitted!" });
    } catch (error) {
        console.error("SQL Error:", error);
        //return NextResponse.json({ error: error.message }, { status: 500 }); // Return actual error message
    }
}
