'use client'

import { PayrollEntry } from '@/lib/payrollData'
import Link from 'next/link'

interface PayrollDetailProps {
  entry: PayrollEntry
  onEdit?: () => void
  onBack?: () => void
}

export default function PayrollDetail({ entry, onEdit, onBack }: PayrollDetailProps) {
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
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payroll Details</h1>
            <p className="text-gray-600 mt-1">Entry #{entry.id}</p>
          </div>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(entry.status)}`}>
            {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Employee Information */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500">Name</label>
            <p className="mt-1 text-sm text-gray-900">{entry.employee.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Position</label>
            <p className="mt-1 text-sm text-gray-900">{entry.employee.position}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Department</label>
            <p className="mt-1 text-sm text-gray-900">{entry.employee.department}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500">Plant</label>
            <p className="mt-1 text-sm text-gray-900">{entry.employee.plant}</p>
          </div>
        </div>
      </div>

      {/* Payroll Breakdown */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Payroll Breakdown</h2>
        
        <div className="space-y-6">
          {/* Earnings */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-md font-medium text-green-800 mb-3">Earnings</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-green-700">Base Salary</span>
                <span className="text-sm font-medium text-green-900">${entry.baseSalary.toLocaleString()}</span>
              </div>
              {entry.bonuses > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm text-green-700">Bonuses</span>
                  <span className="text-sm font-medium text-green-900">${entry.bonuses.toLocaleString()}</span>
                </div>
              )}
              <hr className="border-green-200" />
              <div className="flex justify-between">
                <span className="text-sm font-medium text-green-800">Total Earnings</span>
                <span className="text-sm font-bold text-green-900">
                  ${(entry.baseSalary + entry.bonuses).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="bg-red-50 rounded-lg p-4">
            <h3 className="text-md font-medium text-red-800 mb-3">Deductions</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-red-700">Deductions</span>
                <span className="text-sm font-medium text-red-900">${entry.deductions.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-red-700">Taxes</span>
                <span className="text-sm font-medium text-red-900">${entry.taxes.toLocaleString()}</span>
              </div>
              <hr className="border-red-200" />
              <div className="flex justify-between">
                <span className="text-sm font-medium text-red-800">Total Deductions</span>
                <span className="text-sm font-bold text-red-900">
                  ${(entry.deductions + entry.taxes).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Net Pay */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-blue-800">Net Pay</span>
              <span className="text-2xl font-bold text-blue-900">${entry.netPay.toLocaleString()}</span>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-500">Payroll Date</label>
              <p className="mt-1 text-sm text-gray-900">{new Date(entry.date).toLocaleDateString()}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Daily Salary Rate</label>
              <p className="mt-1 text-sm text-gray-900">${entry.employee.dailySalary}/day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-gray-200 flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          ← Back to List
        </button>
        <div className="space-x-3">
          <Link
            href={`/payroll/edit/${entry.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Edit Entry
          </Link>
        </div>
      </div>
    </div>
  )
}