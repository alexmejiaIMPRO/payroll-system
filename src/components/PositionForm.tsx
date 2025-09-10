'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { positionSchema } from '@/schemas/position'

export default function PositionForm() {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(positionSchema),
  })

  const onSubmit = async (data: any) => {
    await fetch('/api/positions', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    reset()
    location.reload()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Título del cargo" />
      <input {...register('department')} placeholder="Departamento" />
      <input {...register('dailySalary')} placeholder="Salario diario" type="number" />
      <input {...register('isFilled')} type="checkbox" /> ¿Está ocupado?
      <button type="submit">Agregar cargo</button>
    </form>
  )
}

