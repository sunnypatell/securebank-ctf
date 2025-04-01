import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { NextRequest } from "next/server";

// Connect to SQLite database
async function openDb() {
  return open({
    filename: path.join(process.cwd(), "database.sqlite"),
    driver: sqlite3.Database,
  });
}

// logged-in user ID 1
const currentUserId = 1;

export async function GET(req: NextRequest) {
  try {
    const db = await openDb();
    const searchParams = new URL(req.url).searchParams;
    const search = searchParams.get("search") || "";

    let query: string;

    // Only allow this specific payload to break user-level filtering
    const isExactBypass =
      search.trim() === `' OR '1'='1 --`;

    if (isExactBypass) {
      query = `
        SELECT * FROM transactions
        WHERE description LIKE '%${search}%'
      `;
    } else if (search.trim()) {
      query = `
        SELECT * FROM transactions
        WHERE user_id = ${currentUserId}
        AND description LIKE '%${search}%'
      `;
    } else {
      query = `
        SELECT * FROM transactions
        WHERE user_id = ${currentUserId}
      `;
    }

    console.log("Executing query:", query);

    const results = await db.all(query);
    return NextResponse.json(results);
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}