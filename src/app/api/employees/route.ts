import { NextResponse } from 'next/server'
import { EmployeeService } from '@/modules/employee'
import { employeeSchema } from '@/schemas/employee'

export async function GET() {
  const employees = await EmployeeService.getAll()
  return NextResponse.json(employees)
}

export async function POST(req: Request) {
  const body = await req.json()
  const result = employeeSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 })
  }
  const employee = await EmployeeService.create(result.data)
  return NextResponse.json(employee, { status: 201 })
}

