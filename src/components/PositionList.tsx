'use client'
import { useEffect, useState } from 'react'

export default function PositionList() {
  const [positions, setPositions] = useState([])

  useEffect(() => {
    fetch('/api/positions')
      .then(res => res.json())
      .then(setPositions)
  }, [])

  return (
    <div>
      <h2>Lista de Cargos</h2>
      <ul>
        {positions.map((p: any) => (
          <li key={p.id}>
            <strong>{p.title}</strong> — {p.department} — ${p.dailySalary}/día
          </li>
        ))}
      </ul>
    </div>
  )
}

