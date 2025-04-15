import { NextResponse } from "next/server"
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import path from "path"
import { NextRequest } from "next/server"
import { cookies } from "next/headers"

// Connect to SQLite database
async function openDb() {
  return open({
    filename: path.join(process.cwd(), "database.sqlite"),
    driver: sqlite3.Database,
  })
}
// get all transactions, vulnerable to sql injection via the search box
export async function GET(req: NextRequest) {
  try {
    const db = await openDb();
    const searchParams = new URL(req.url).searchParams;
    const search = searchParams.get("search") || "";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const dateClause = (startDate && endDate)
      ? `AND substr(transactions.date, 1, 10) BETWEEN '${startDate}' AND '${endDate}'`
      : "";
    const devMode = req.headers.get("x-dev-mode") === "true";
    const cookieStore = req.cookies;
    const userId = parseInt(cookieStore.get("userId")?.value || "1");

    //  dev hint symbols
    const hasSuspiciousChars = /(--|;|'|\/\*|\*\/)/gi.test(search);
    const sanitized = search.replace(/(--|;|'|\/\*|\*\/)/gi, "");
    console.log("search:", search)
    console.log("startDate:", startDate)
    console.log("endDate:", endDate)
    console.log("devMode:", devMode)
    let query: string;
    let results;

    // devMode skips user-level filtering
    if (search.trim()) {
      if (devMode) {
        query = `
          SELECT transactions.*, users.username, transactions.user_id AS userId
          FROM transactions
          JOIN users ON transactions.user_id = users.id
          WHERE transactions.description LIKE '%${search}%'
          ${dateClause}
        `;
      } else {
        query = `
          SELECT transactions.*, users.username, transactions.user_id AS userId
          FROM transactions
          JOIN users ON transactions.user_id = users.id
          WHERE transactions.user_id = ${userId}
          AND transactions.description LIKE '%${sanitized}%'
          ${dateClause}
        `;
      }
    } else {
      // regular query to view own transactions
      query = `
        SELECT transactions.*, users.username, transactions.user_id AS userId
        FROM transactions
        JOIN users ON transactions.user_id = users.id
        WHERE transactions.user_id = ${userId}
        ${dateClause}
      `;
    }

    console.log("Executing query:", query);
    results = await db.all(query);

    // Add hint message only when suspicious input is used
    if (hasSuspiciousChars && !devMode) {
      return NextResponse.json({
        mode: "production",
        message: "Access denied in production. Development headers are required.",
        transactions: [] // preventss injection
      });
    }

    return NextResponse.json(results);
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
// POST handler
// This has a hidden SQL injection vulnerability that only activates on a specific datee
export async function POST(req: Request) {
  try {
    const db = await openDb()
    const body = await req.json()
    const cookieStore = await cookies()
    const userId = parseInt(cookieStore.get("userId")?.value || "1")
    const { date, description, amount, type } = body

    if (!date || !description || !amount || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

  // simulate a developer debug hook that runs raw SQL only on maintenance Wednesdays
  const [year, month, day] = date.split("-").map(Number)
  const isWednesday = new Date(year, month - 1, day).getDay() === 3
  const isDebugMode = type === "debug"
  const isSuspiciousPayload = description.includes(";") || description.toLowerCase().includes("update")

  if (isDebugMode && isWednesday && isSuspiciousPayload) {
    console.log("Running maintenance SQL on a Wednesday")
    console.log("Payload:", description)
    await db.exec(description)
    return NextResponse.json({ success: true, message: "Injected SQL executed" })
  }

  if (isSuspiciousPayload) {
    return NextResponse.json(
      { error: "Suspicious characters not allowed outside of debug mode on Wednesdays" },
      { status: 400 }
    )
  }

    //  default insert path
    await db.run(
      `INSERT INTO transactions (user_id, date, description, amount, type)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, date, description, parseFloat(amount), type]
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("POST /api/transactions error:", err)
    return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 })
  }
}
  
 