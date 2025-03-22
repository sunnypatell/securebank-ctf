import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "database.sqlite");
const db = new Database(dbPath);

// Ensure the Users table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(1000) UNIQUE,
    password VARCHAR(1000),
    role VARCHAR(1000)
  );

  CREATE TABLE IF NOT EXISTS Transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender VARCHAR(1000), 
    recipient VARCHAR(1000),  
    amount INTEGER
  );

  CREATE TABLE IF NOT EXISTS Comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    commenter VARCHAR(1000), 
    recipient VARCHAR(1000),  
    feedback TEXT
  );
`);

// Insert a hardcoded admin user if none exists
const adminExists = db.prepare("SELECT * FROM Users WHERE username = 'admin'").get();

if (!adminExists) {
  db.prepare("INSERT INTO Users (username, password, role) VALUES (?, ?, ?)").run(
    "admin",
    "admin123",
    "admin"
  );
  console.log("Admin user created: admin / admin123");
} else {
  console.log("Admin user already exists.");
}

export default db;
