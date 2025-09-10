'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { employeeSchema } from '@/schemas/employee'

export default function EmployeeForm() {
  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(employeeSchema),
  })

  const onSubmit = async (data: any) => {
    await fetch('/api/employees', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    reset()
    location.reload()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Nombre" />
      <input {...register('payrollNumber')} placeholder="Número de nómina" type="number" />
      <input {...register('dailySalary')} placeholder="Salario diario" type="number" />
      <input {...register('positionId')} placeholder="ID del puesto" type="number" />
      <input {...register('shift')} placeholder="Turno" />
      <input {...register('nss')} placeholder="NSS" />
      <input {...register('rfc')} placeholder="RFC" />
      <input {...register('curp')} placeholder="CURP" />
      <input {...register('birthPlace')} placeholder="Lugar de nacimiento" />
      <input {...register('birthDate')} type="date" />
      <input {...register('gender')} placeholder="Género" />
      <input {...register('bloodType')} placeholder="Tipo de sangre" />
      <input {...register('plant')} placeholder="Planta (PM, SSD, CHU)" />
      <input {...register('department')} placeholder="Departamento" />
      <input {...register('hireDate')} type="date" />
      <input {...register('payrollType')} placeholder="Tipo de nómina" />
      <input {...register('source')} placeholder="Fuente de contratación" />
      <input {...register('transportRoute')} placeholder="Ruta de transporte" />
      <input {...register('transportStop')} placeholder="Parada de ruta" />
      <input {...register('costCenter')} placeholder="Centro de costos" />
      <input {...register('transportType')} placeholder="Tipo de transporte" />
      <input {...register('bankAccount')} placeholder="Cuenta bancaria" />
      <input {...register('collarType')} placeholder="Tipo de collar" />
      <button type="submit">Agregar empleado</button>
    </form>
  )
}

