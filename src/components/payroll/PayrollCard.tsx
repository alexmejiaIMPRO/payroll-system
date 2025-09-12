'use client'

import { PayrollEntry } from '@/lib/payrollData'

interface PayrollCardProps {
  entry: PayrollEntry
  onClick?: () => void
}

export default function PayrollCard({ entry, onClick }: PayrollCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'approved':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{entry.employee.name}</h3>
          <p className="text-sm text-gray-600">{entry.employee.position}</p>
          <p className="text-xs text-gray-500">{entry.employee.department} • {entry.employee.plant}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(entry.status)}`}>
          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Salary:</span>
          <span className="font-medium">${entry.baseSalary.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Deductions:</span>
          <span className="text-red-600">-${entry.deductions.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxes:</span>
          <span className="text-red-600">-${entry.taxes.toLocaleString()}</span>
        </div>
        {entry.bonuses > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Bonuses:</span>
            <span className="text-green-600">+${entry.bonuses.toLocaleString()}</span>
          </div>
        )}
        <hr className="my-2" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Net Pay:</span>
          <span className="text-green-600">${entry.netPay.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        Date: {new Date(entry.date).toLocaleDateString()}
      </div>
    </div>
  )
}