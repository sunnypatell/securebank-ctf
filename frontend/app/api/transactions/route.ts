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



// GET handler (already works for filtering and payload bypass)
export async function GET(req: NextRequest) {
  try {
    const db = await openDb()
    const searchParams = new URL(req.url).searchParams
    const search = searchParams.get("search") || ""
    const cookieStore = req.cookies 
    const userId = parseInt(cookieStore.get("userId")?.value || "1")

    let query: string

    // Only allow this specific payload to break user-level filtering
    const isExactBypass = search.trim() === `' OR '1'='1 --`

    if (isExactBypass) {
      query = `
        SELECT transactions.*, users.username, transactions.user_id AS userId
        FROM transactions
        JOIN users ON transactions.user_id = users.id
        WHERE transactions.description LIKE '%${search}%'
      `;
    } else if (search.trim()) {
      query = `
        SELECT transactions.*, users.username, transactions.user_id AS userId
        FROM transactions
        JOIN users ON transactions.user_id = users.id
        WHERE transactions.user_id = ${userId}
        AND transactions.description LIKE '%${search}%'
      `;
    } else {
      query = `
        SELECT transactions.*, users.username, transactions.user_id AS userId
        FROM transactions
        JOIN users ON transactions.user_id = users.id
        WHERE transactions.user_id = ${userId}
      `;
    }

    console.log("Executing query:", query)

    const results = await db.all(query)
    return NextResponse.json(results)
  } catch (err) {
    console.error("Database error:", err)
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
  }
}
// POST handler
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

    // Only allow raw SQL injection if the date is exactly October 10, 2025
    if (date === "2024-10-10" && description.includes(";")) {
      const injectedSQL = `
        INSERT INTO transactions (user_id, date, description, amount, type)
        VALUES (${userId}, '${date}', '${description}', ${parseFloat(amount)}, '${type}');
      `
      console.log("Executing HIDDEN-DATE SQL INJECTION:", injectedSQL)
      await db.exec(injectedSQL)
      return NextResponse.json({ success: true, message: "Injected query executed" })
    }

    // Safe default insert
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