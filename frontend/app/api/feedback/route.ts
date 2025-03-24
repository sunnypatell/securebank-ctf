import { NextResponse } from "next/server";
import db from "../../../database/db";  

export async function POST(req: Request) {
  try {
    const { user, message } = await req.json();
    
    if (!user || !message) {
      return NextResponse.json({ error: "User and message are required" }, { status: 400 });
    }

    const stmt = db.prepare("INSERT INTO feedback (user, message, date, read) VALUES (?, ?, CURRENT_TIMESTAMP, ?)");
    stmt.run(user, message, 0);

    return NextResponse.json({ message: "Feedback submitted successfully" }); // Always return JSON
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const feedbacks = db.prepare("SELECT * FROM feedback ORDER BY date DESC").all();
    return NextResponse.json({ feedbacks });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ feedbacks: [] }, { status: 500 }); // Ensure JSON is always returned
  }
}

