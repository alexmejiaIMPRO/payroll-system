import PositionForm from '@/components/PositionForm'
import PositionList from '@/components/PositionList'

export default function PositionsPage() {
  return (
    <div>
      <h1>Cargos</h1>
      <PositionForm onSuccess={() => location.reload()} />
      <PositionList />
    </div>
  )
}

