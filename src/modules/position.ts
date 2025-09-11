import { db } from '@/lib/database'

export interface Position {
  id: number
  title: string
  department: string
  dailySalary: number
  isFilled: boolean
}

export interface CreatePositionData {
  title: string
  department: string
  dailySalary: number
}

export class PositionService {
  static getAll(): Position[] {
    const stmt = db.prepare('SELECT * FROM positions')
    const rows = stmt.all() as any[]
    return rows.map(row => ({
      ...row,
      isFilled: Boolean(row.isFilled)
    }))
  }

  static getById(id: number): Position | null {
    const stmt = db.prepare('SELECT * FROM positions WHERE id = ?')
    const row = stmt.get(id) as any
    if (!row) return null
    return {
      ...row,
      isFilled: Boolean(row.isFilled)
    }
  }

  static create(data: CreatePositionData): Position {
    const stmt = db.prepare(`
      INSERT INTO positions (title, department, dailySalary)
      VALUES (?, ?, ?)
    `)
    const result = stmt.run(data.title, data.department, data.dailySalary)
    return this.getById(result.lastInsertRowid as number)!
  }

  static update(id: number, data: Partial<CreatePositionData & { isFilled: boolean }>): Position | null {
    const current = this.getById(id)
    if (!current) return null

    const updates: string[] = []
    const values: any[] = []

    if (data.title !== undefined) {
      updates.push('title = ?')
      values.push(data.title)
    }
    if (data.department !== undefined) {
      updates.push('department = ?')
      values.push(data.department)
    }
    if (data.dailySalary !== undefined) {
      updates.push('dailySalary = ?')
      values.push(data.dailySalary)
    }
    if (data.isFilled !== undefined) {
      updates.push('isFilled = ?')
      values.push(data.isFilled ? 1 : 0)
    }

    if (updates.length === 0) return current

    values.push(id)
    const stmt = db.prepare(`UPDATE positions SET ${updates.join(', ')} WHERE id = ?`)
    stmt.run(...values)

    return this.getById(id)!
  }

  static delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM positions WHERE id = ?')
    const result = stmt.run(id)
    return result.changes > 0
  }
}