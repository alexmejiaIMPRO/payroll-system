'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PayrollTable from '@/components/payroll/PayrollTable'
import PayrollCard from '@/components/payroll/PayrollCard'
import { initialPayrollEntries, PayrollEntry } from '@/lib/payrollData'
import { Plus, Grid, List } from 'lucide-react'

export default function PayrollDashboard() {
  const router = useRouter()
  const [payrollEntries, setPayrollEntries] = useState<PayrollEntry[]>(initialPayrollEntries)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredEntries = payrollEntries.filter(entry => 
    filterStatus === 'all' || entry.status === filterStatus
  )

  const handleView = (id: number) => {
    router.push(`/payroll/${id}`)
  }

  const handleEdit = (id: number) => {
    router.push(`/payroll/edit/${id}`)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this payroll entry?')) {
      setPayrollEntries(prev => prev.filter(entry => entry.id !== id))
    }
  }

  const handleCardClick = (id: number) => {
    router.push(`/payroll/${id}`)
  }

  // Calculate summary statistics
  const totalEntries = filteredEntries.length
  const totalGrossPay = filteredEntries.reduce((sum, entry) => sum + entry.baseSalary + entry.bonuses, 0)
  const totalDeductions = filteredEntries.reduce((sum, entry) => sum + entry.deductions + entry.taxes, 0)
  const totalNetPay = filteredEntries.reduce((sum, entry) => sum + entry.netPay, 0)

  const statusCounts = payrollEntries.reduce((acc, entry) => {
    acc[entry.status] = (acc[entry.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage employee payroll entries and calculations</p>
        </div>
        <Link
          href="/payroll/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Payroll Entry</span>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Entries</p>
              <p className="text-3xl font-bold text-gray-900">{totalEntries}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full text-white">
              📊
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Gross Pay</p>
              <p className="text-3xl font-bold text-gray-900">${totalGrossPay.toLocaleString()}</p>
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
              <p className="text-3xl font-bold text-gray-900">${totalDeductions.toLocaleString()}</p>
            </div>
            <div className="bg-red-500 p-3 rounded-full text-white">
              📉
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Net Pay</p>
              <p className="text-3xl font-bold text-gray-900">${totalNetPay.toLocaleString()}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full text-white">
              💰
            </div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Status Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{statusCounts.pending || 0}</p>
            <p className="text-sm text-yellow-700">Pending</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{statusCounts.approved || 0}</p>
            <p className="text-sm text-blue-700">Approved</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{statusCounts.paid || 0}</p>
            <p className="text-sm text-green-700">Paid</p>
          </div>
        </div>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`p-2 rounded-md ${viewMode === 'cards' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Payroll Entries */}
      {viewMode === 'table' ? (
        <PayrollTable
          entries={filteredEntries}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((entry) => (
            <PayrollCard
              key={entry.id}
              entry={entry}
              onClick={() => handleCardClick(entry.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}


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
