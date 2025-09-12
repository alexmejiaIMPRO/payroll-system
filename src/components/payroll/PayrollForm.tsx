'use client'

import { useState, useEffect } from 'react'
import { mockEmployees, calculateNetPay, calculateBaseSalary, PayrollEntry } from '@/lib/payrollData'

interface PayrollFormProps {
  initialData?: Partial<PayrollEntry>
  onSubmit: (data: PayrollFormData) => void
  onCancel: () => void
  isEditing?: boolean
}

export interface PayrollFormData {
  employeeId: number
  baseSalary: number
  deductions: number
  taxes: number
  bonuses: number
  date: string
  status: 'pending' | 'approved' | 'paid'
}

export default function PayrollForm({ initialData, onSubmit, onCancel, isEditing = false }: PayrollFormProps) {
  const [formData, setFormData] = useState<PayrollFormData>({
    employeeId: initialData?.employeeId || 0,
    baseSalary: initialData?.baseSalary || 0,
    deductions: initialData?.deductions || 0,
    taxes: initialData?.taxes || 0,
    bonuses: initialData?.bonuses || 0,
    date: initialData?.date || new Date().toISOString().split('T')[0],
    status: initialData?.status || 'pending'
  })

  const [netPay, setNetPay] = useState(0)
  const [selectedEmployee, setSelectedEmployee] = useState(
    initialData?.employee || mockEmployees.find(emp => emp.id === initialData?.employeeId) || null
  )

  // Calculate net pay whenever relevant fields change
  useEffect(() => {
    const calculated = calculateNetPay(formData.baseSalary, formData.deductions, formData.taxes, formData.bonuses)
    setNetPay(calculated)
  }, [formData.baseSalary, formData.deductions, formData.taxes, formData.bonuses])

  const handleEmployeeChange = (employeeId: number) => {
    const employee = mockEmployees.find(emp => emp.id === employeeId)
    if (employee) {
      setSelectedEmployee(employee)
      const autoBaseSalary = calculateBaseSalary(employee.dailySalary)
      setFormData(prev => ({
        ...prev,
        employeeId,
        baseSalary: autoBaseSalary
      }))
    }
  }

  const handleInputChange = (field: keyof PayrollFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.employeeId === 0) {
      alert('Please select an employee')
      return
    }
    onSubmit(formData)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEditing ? 'Edit Payroll Entry' : 'Create Payroll Entry'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Employee Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Employee <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.employeeId}
              onChange={(e) => handleEmployeeChange(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isEditing}
            >
              <option value={0}>Select Employee</option>
              {mockEmployees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name} - {employee.position}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Payroll Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Base Salary */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Base Salary <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.baseSalary}
              onChange={(e) => handleInputChange('baseSalary', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {selectedEmployee && (
              <p className="text-xs text-gray-500">
                Auto-calculated: ${selectedEmployee.dailySalary}/day × 30 days = ${calculateBaseSalary(selectedEmployee.dailySalary)}
              </p>
            )}
          </div>

          {/* Deductions */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Deductions <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.deductions}
              onChange={(e) => handleInputChange('deductions', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Taxes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Taxes <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.taxes}
              onChange={(e) => handleInputChange('taxes', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Bonuses */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Bonuses (Optional)
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.bonuses}
              onChange={(e) => handleInputChange('bonuses', Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value as 'pending' | 'approved' | 'paid')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="paid">Paid</option>
            </select>
          </div>
        </div>

        {/* Net Pay Preview */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payroll Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Base Salary:</span>
              <div className="font-medium">${formData.baseSalary.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-gray-600">Bonuses:</span>
              <div className="font-medium text-green-600">+${formData.bonuses.toLocaleString()}</div>
            </div>
            <div>
              <span className="text-gray-600">Deductions:</span>
              <div className="font-medium text-red-600">-${(formData.deductions + formData.taxes).toLocaleString()}</div>
            </div>
            <div>
              <span className="text-gray-600">Net Pay:</span>
              <div className="text-xl font-bold text-green-600">${netPay.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isEditing ? 'Update Entry' : 'Create Entry'}
          </button>
        </div>
      </form>
    </div>
  )
}