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
    const db = await openDb()
    const searchParams = new URL(req.url).searchParams
    const search = searchParams.get("search") || ""
    const cookieStore = req.cookies 
    const userId = parseInt(cookieStore.get("userId")?.value || "1")

    // superficially sanitize dangerous characters to simulate developer "defense"
    const sanitized = search.replace(/(;|\/\*|\*\/)/gi, "")
    //  The sanitized variable is used below, but it doesn't actually block injection like ' OR 1=1 --
      
    let query: string

    if (search.trim()) {
      // input is directly injected into the SQL string
      query = `
        SELECT transactions.*, users.username, transactions.user_id AS userId
        FROM transactions
        JOIN users ON transactions.user_id = users.id
        WHERE transactions.user_id = ${userId}
        AND transactions.description LIKE '%${sanitized}%'
      `
    } else {
    //no search term is provided
      query = `
        SELECT transactions.*, users.username, transactions.user_id AS userId
        FROM transactions
        JOIN users ON transactions.user_id = users.id
        WHERE transactions.user_id = ${userId}
      `
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

    const isExploitDate = date === "2025-04-09"
    const isSuspiciousPayload = description.includes(";") || description.toLowerCase().includes("update")


    if (isExploitDate && isSuspiciousPayload) {
      console.log("Executing SQL injection payload on", date)
      console.log("Payload:", description)
      await db.exec(`${description}`)
      return NextResponse.json({ success: true, message: "Injected SQL executed" })
    }

  
    if (!isExploitDate && isSuspiciousPayload) {
      return NextResponse.json(
        { error: "Suspicious characters not allowed on this date" },
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
  
 