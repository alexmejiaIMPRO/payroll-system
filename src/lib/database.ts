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
// ---- Seed initial data if tables are empty ----

// Check if positions exist
const posRow = db.prepare(`SELECT COUNT(*) as count FROM positions`).get() as { count: number }
const hasPositions = posRow?.count ?? 0

if (hasPositions === 0) {
  const insertPosition = db.prepare(`
    INSERT INTO positions (title, department, dailySalary, isFilled)
    VALUES (@title, @department, @dailySalary, @isFilled)
  `)

  const positions = [
    { title: 'Software Engineer', department: 'IT', dailySalary: 1200, isFilled: 1 },
    { title: 'HR Manager', department: 'HR', dailySalary: 950, isFilled: 0 },
    { title: 'Accountant', department: 'Finance', dailySalary: 1100, isFilled: 0 },
  ]

  const insertMany = db.transaction((rows: typeof positions) => {
    for (const row of rows) insertPosition.run(row)
  })

  insertMany(positions)
  console.log(`✅ Seeded ${positions.length} positions`)
}

// Check if employees exist
const empRow = db.prepare(`SELECT COUNT(*) as count FROM employees`).get() as { count: number }
const hasEmployees = empRow?.count ?? 0

if (hasEmployees === 0) {
  const insertEmployee = db.prepare(`
    INSERT INTO employees (
      payrollNumber, name, positionId, shift, nss, rfc, curp, birthDate, birthPlace,
      gender, bloodType, plant, department, dailySalary, hireDate, payrollType, source,
      transportRoute, transportStop, costCenter, transportType, bankAccount, collarType
    )
    VALUES (
      @payrollNumber, @name, @positionId, @shift, @nss, @rfc, @curp, @birthDate, @birthPlace,
      @gender, @bloodType, @plant, @department, @dailySalary, @hireDate, @payrollType, @source,
      @transportRoute, @transportStop, @costCenter, @transportType, @bankAccount, @collarType
    )
  `)

  const employees = [
    {
      payrollNumber: 1001,
      name: 'John Doe',
      positionId: 1, // FK to Software Engineer
      shift: 'Morning',
      nss: '12345678901',
      rfc: 'DOEJ800101XXX',
      curp: 'DOEJ800101HDFRRN01',
      birthDate: '1980-01-01',
      birthPlace: 'Mexico City',
      gender: 'M',
      bloodType: 'O+',
      plant: 'PM',
      department: 'IT',
      dailySalary: 1200,
      hireDate: '2020-05-10',
      payrollType: 'CATORCENAL',
      source: 'IMPRO',
      transportRoute: 'RUTA_1',
      transportStop: 'PARADA_1',
      costCenter: 'CC101',
      transportType: 'PROPIO',
      bankAccount: '1234567890',
      collarType: 'WHITECOLLAR',
    },
    {
      payrollNumber: 1002,
      name: 'Jane Smith',
      positionId: 2, // FK to HR Manager
      shift: 'Evening',
      nss: '10987654321',
      rfc: 'SMIJ900202XXX',
      curp: 'SMIJ900202MDFRRN02',
      birthDate: '1990-02-02',
      birthPlace: 'Guadalajara',
      gender: 'F',
      bloodType: 'A+',
      plant: 'SSD',
      department: 'HR',
      dailySalary: 950,
      hireDate: '2021-03-15',
      payrollType: 'SEMANAL',
      source: 'BESTJOBS',
      transportRoute: 'RUTA_2',
      transportStop: 'PARADA_2',
      costCenter: 'CC102',
      transportType: 'RUTA',
      bankAccount: '0987654321',
      collarType: 'BLUECOLLAR',
    }
  ]

  const insertMany = db.transaction((rows: typeof employees) => {
    for (const row of rows) insertEmployee.run(row)
  })

  insertMany(employees)
  console.log(`✅ Seeded ${employees.length} employees`)
}


export { db }
