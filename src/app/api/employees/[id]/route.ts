import { NextResponse } from 'next/server'
import { EmployeeService } from '@/modules/employee'
import { employeeSchema } from '@/schemas/employee'

// GET: Obtener un empleado por ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const employee = await EmployeeService.getById(Number(params.id))
  return employee
    ? NextResponse.json(employee)
    : NextResponse.json({ error: 'Employee not found' }, { status: 404 })
}

// PUT: Actualizar un empleado por ID con validación
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const result = employeeSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 })
  }

  const updated = await EmployeeService.update(Number(params.id), result.data)
  return NextResponse.json(updated)
}

// DELETE: Eliminar un empleado por ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await EmployeeService.delete(Number(params.id))
  return NextResponse.json({ success: true })
}