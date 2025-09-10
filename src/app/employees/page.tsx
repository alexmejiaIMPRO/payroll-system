'use client'
import EmployeeForm from '@/components/EmployeeForm'
import EmployeeList from '@/components/EmployeeList'

export default function EmployeesPage() {
  return (
    <div>
      <h1>Empleados</h1>
      <EmployeeForm onSuccess={() => location.reload()} />
      <EmployeeList />
    </div>
  )
}

