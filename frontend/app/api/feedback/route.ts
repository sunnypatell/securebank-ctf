import { NextResponse } from "next/server";
import db from "../../../database/db";  
import { cookies } from "next/headers";

// Submit Feedback
export async function POST(req: Request) {
  try {
    const { message } = await req.json(); 
    const userSession = (await cookies()).get("session");

    if (!userSession) {
      return NextResponse.json({ error: "User is not logged in" }, { status: 401 });
    }

    const user = JSON.parse(userSession.value);

    if (!user.username || !message) {
      return NextResponse.json({ error: "User and message are required" }, { status: 400 });
    }

    const stmt = db.prepare("INSERT INTO feedback (user, message, date, read) VALUES (?, ?, CURRENT_TIMESTAMP, ?)");
    stmt.run(user.username, message, 0);

    return NextResponse.json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}

// Fetch All Feedback
export async function GET() {
  try {
    const feedbacks = db.prepare("SELECT * FROM feedback ORDER BY date DESC").all();
    return NextResponse.json({ feedbacks });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ feedbacks: [] }, { status: 500 });
  }
}

// DELETE feedback (Admins only)
export async function DELETE(req: Request) {
  try {
      const userSession = (await cookies()).get("session");

      if (!userSession) {
          return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
      }

      const user = JSON.parse(userSession.value);

      if (user.role !== "admin") {
          return NextResponse.json({ error: "Permission denied. Only admins can delete feedback." }, { status: 403 });
      }

      const { id } = await req.json();
      if (!id) {
          return NextResponse.json({ error: "Feedback ID is required" }, { status: 400 });
      }

      const stmt = db.prepare("DELETE FROM feedback WHERE id = ?");
      stmt.run(id);

      return NextResponse.json({ message: "Feedback deleted successfully!" }, { status: 200 });
  } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Failed to delete feedback" }, { status: 500 });
  }
}