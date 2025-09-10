import { NextResponse } from 'next/server'
import { PositionService } from '@/modules/position'
import { positionSchema } from '@/schemas/position'

// GET: Obtener una posición por ID
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const position = await PositionService.getById(Number(params.id))
  return position
    ? NextResponse.json(position)
    : NextResponse.json({ error: 'No encontrado' }, { status: 404 })
}

// PUT: Actualizar una posición por ID con validación
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json()
  const result = positionSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json({ error: result.error.format() }, { status: 400 })
  }

  const updated = await PositionService.update(Number(params.id), result.data)
  return NextResponse.json(updated)
}

// DELETE: Eliminar una posición por ID
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await PositionService.delete(Number(params.id))
  return NextResponse.json({ success: true })
}

