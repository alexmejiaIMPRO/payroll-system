import Database from 'better-sqlite3'
import path from 'path'

// Initialize SQLite database
const dbPath = path.join(process.cwd(), 'database.sqlite')
const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    dailySalary REAL NOT NULL,
    isFilled INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    payrollNumber INTEGER UNIQUE NOT NULL,
    name TEXT NOT NULL,
    positionId INTEGER NOT NULL,
    shift TEXT NOT NULL,
    nss TEXT NOT NULL,
    rfc TEXT NOT NULL,
    curp TEXT NOT NULL,
    birthDate TEXT NOT NULL,
    birthPlace TEXT NOT NULL,
    gender TEXT NOT NULL,
    bloodType TEXT NOT NULL,
    plant TEXT NOT NULL,
    department TEXT NOT NULL,
    dailySalary REAL NOT NULL,
    hireDate TEXT NOT NULL,
    payrollType TEXT NOT NULL,
    source TEXT NOT NULL,
    transportRoute TEXT NOT NULL,
    transportStop TEXT NOT NULL,
    costCenter TEXT NOT NULL,
    transportType TEXT NOT NULL,
    bankAccount TEXT NOT NULL,
    collarType TEXT NOT NULL,
    FOREIGN KEY (positionId) REFERENCES positions (id)
  );
`)

export { db }