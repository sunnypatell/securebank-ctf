import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);
// may change name of Comments to something else
db.exec(`
  CREATE TABLE IF NOT EXISTS Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(1000),
    password VARCHAR(1000),
    role VARCHAR(1000)
  );

  CREATE TABLE IF NOT EXISTS Transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    FROM VARCHAR(1000),
    TO VARCHAR(1000),
    AMOUNT INTEGER
  );

  CREATE TABLE IF NOT EXISTS Comments ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    FROM VARCHAR(1000),
    TO VARCHAR(1000),
    AMOUNT INTEGER
  );



`);

export default db;
