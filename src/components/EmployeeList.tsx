'use client'
import { useEffect, useState } from 'react'
import EmployeeForm from './EmployeeForm'

export default function EmployeeList() {
  const [employees, setEmployees] = useState([])
  const [editing, setEditing] = useState<any>(null)

  const fetchEmployees = () => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(setEmployees)
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleDelete = async (id: number) => {
    await fetch(`/api/employees/${id}`, { method: 'DELETE' })
    fetchEmployees()
  }

  return (
    <div>
      <h2>Lista de Empleados</h2>
      {editing && (
        <EmployeeForm editData={editing} onSuccess={() => {
          setEditing(null)
          fetchEmployees()
        }} />
      )}
      <ul>
        {employees.map((e: any) => (
          <li key={e.id}>
            <strong>{e.name}</strong> — {e.position?.title} — ${e.dailySalary}/día
            <button onClick={() => setEditing(e)}>Editar</button>
            <button onClick={() => handleDelete(e.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

