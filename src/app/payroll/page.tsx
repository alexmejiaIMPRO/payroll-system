'use client'
import { useEffect, useState } from 'react'

interface PayrollData {
  id: number
  name: string
  payrollNumber: number
  position: { title: string }
  department: string
  dailySalary: number
  payrollType: string
  bankAccount: string
}

export default function PayrollPage() {
  const [employees, setEmployees] = useState<PayrollData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const [payrollType, setPayrollType] = useState('all')

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees')
        const data = await response.json()
        setEmployees(data)
      } catch (error) {
        console.error('Error fetching employees:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  const filteredEmployees = employees.filter(emp => 
    payrollType === 'all' || emp.payrollType === payrollType
  )

  const calculatePayroll = (employee: PayrollData) => {
    const daysInPeriod = employee.payrollType === 'SEMANAL' ? 7 : 14
    const grossPay = employee.dailySalary * daysInPeriod
    const taxes = grossPay * 0.16 // 16% tax rate
    const socialSecurity = grossPay * 0.0725 // 7.25% social security
    const totalDeductions = taxes + socialSecurity
    const netPay = grossPay - totalDeductions

    return {
      grossPay,
      taxes,
      socialSecurity,
      totalDeductions,
      netPay,
      daysInPeriod
    }
  }

  const totalPayroll = filteredEmployees.reduce((sum, emp) => {
    return sum + calculatePayroll(emp).netPay
  }, 0)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600 mt-2">Process and manage employee payroll</p>
        </div>
        <div className="flex space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="current">Current Period</option>
            <option value="previous">Previous Period</option>
            <option value="custom">Custom Period</option>
          </select>
          <select
            value={payrollType}
            onChange={(e) => setPayrollType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="SEMANAL">Weekly</option>
            <option value="CATORCENAL">Bi-weekly</option>
          </select>
        </div>
      </div>

      {/* Payroll Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900">{filteredEmployees.length}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full text-white">
              👥
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Gross Pay</p>
              <p className="text-3xl font-bold text-gray-900">
                ${filteredEmployees.reduce((sum, emp) => sum + calculatePayroll(emp).grossPay, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-full text-white">
              💵
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Deductions</p>
              <p className="text-3xl font-bold text-gray-900">
                ${filteredEmployees.reduce((sum, emp) => sum + calculatePayroll(emp).totalDeductions, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-red-500 p-3 rounded-full text-white">
              📉
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Net Payroll</p>
              <p className="text-3xl font-bold text-gray-900">
                ${totalPayroll.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full text-white">
              💰
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Details Table */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            Payroll Details - {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} Period
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pay Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deductions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Pay
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bank Account
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => {
                const payroll = calculatePayroll(employee)
                return (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                            {employee.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {employee.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            #{employee.payrollNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.position.title}</div>
                      <div className="text-sm text-gray-500">{employee.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        employee.payrollType === 'SEMANAL' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {employee.payrollType === 'SEMANAL' ? 'Weekly' : 'Bi-weekly'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payroll.daysInPeriod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${payroll.grossPay.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${payroll.totalDeductions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${payroll.netPay.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.bankAccount}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Total employees: {filteredEmployees.length}
            </div>
            <div className="text-lg font-semibold text-gray-900">
              Total Net Payroll: ${totalPayroll.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Export to CSV
        </button>
        <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Generate Reports
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Process Payroll
        </button>
      </div>
    </div>
  )
}