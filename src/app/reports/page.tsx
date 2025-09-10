'use client'
import { useEffect, useState } from 'react'

interface ReportData {
  totalEmployees: number
  totalPositions: number
  departmentBreakdown: { [key: string]: number }
  plantBreakdown: { [key: string]: number }
  payrollTypeBreakdown: { [key: string]: number }
  collarTypeBreakdown: { [key: string]: number }
  averageSalary: number
  totalPayroll: number
}

export default function ReportsPage() {
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState('overview')

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const [employeesRes, positionsRes] = await Promise.all([
          fetch('/api/employees'),
          fetch('/api/positions')
        ])
        
        const employees = await employeesRes.json()
        const positions = await positionsRes.json()

        // Calculate report data
        const departmentBreakdown = employees.reduce((acc: any, emp: any) => {
          acc[emp.department] = (acc[emp.department] || 0) + 1
          return acc
        }, {})

        const plantBreakdown = employees.reduce((acc: any, emp: any) => {
          acc[emp.plant] = (acc[emp.plant] || 0) + 1
          return acc
        }, {})

        const payrollTypeBreakdown = employees.reduce((acc: any, emp: any) => {
          acc[emp.payrollType] = (acc[emp.payrollType] || 0) + 1
          return acc
        }, {})

        const collarTypeBreakdown = employees.reduce((acc: any, emp: any) => {
          acc[emp.collarType] = (acc[emp.collarType] || 0) + 1
          return acc
        }, {})

        const totalPayroll = employees.reduce((sum: number, emp: any) => sum + emp.dailySalary, 0)
        const averageSalary = employees.length > 0 ? totalPayroll / employees.length : 0

        setReportData({
          totalEmployees: employees.length,
          totalPositions: positions.length,
          departmentBreakdown,
          plantBreakdown,
          payrollTypeBreakdown,
          collarTypeBreakdown,
          averageSalary,
          totalPayroll
        })
      } catch (error) {
        console.error('Error fetching report data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReportData()
  }, [])

  if (loading || !reportData) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const reportTypes = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'departments', name: 'Departments', icon: '🏢' },
    { id: 'plants', name: 'Plants', icon: '🏭' },
    { id: 'payroll', name: 'Payroll', icon: '💰' },
    { id: 'workforce', name: 'Workforce', icon: '👥' }
  ]

  const renderChart = (data: { [key: string]: number }, title: string, color: string) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {Object.entries(data).map(([key, value]) => {
          const percentage = (value / reportData.totalEmployees) * 100
          return (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{key}</span>
                <span className="font-medium">{value} ({percentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${color} h-2 rounded-full`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Comprehensive insights into your workforce</p>
        </div>
        <div className="flex space-x-4">
          <select
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {reportTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.icon} {type.name}
              </option>
            ))}
          </select>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900">{reportData.totalEmployees}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full text-white text-2xl">
              👥
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Positions</p>
              <p className="text-3xl font-bold text-gray-900">{reportData.totalPositions}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-full text-white text-2xl">
              💼
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Salary</p>
              <p className="text-3xl font-bold text-gray-900">
                ${reportData.averageSalary.toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full text-white text-2xl">
              💰
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Daily Payroll</p>
              <p className="text-3xl font-bold text-gray-900">
                ${reportData.totalPayroll.toLocaleString()}
              </p>
            </div>
            <div className="bg-orange-500 p-3 rounded-full text-white text-2xl">
              📈
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderChart(reportData.departmentBreakdown, 'Department Distribution', 'bg-blue-500')}
        {renderChart(reportData.plantBreakdown, 'Plant Distribution', 'bg-green-500')}
        {renderChart(reportData.payrollTypeBreakdown, 'Payroll Type Distribution', 'bg-purple-500')}
        {renderChart(reportData.collarTypeBreakdown, 'Collar Type Distribution', 'bg-orange-500')}
      </div>

      {/* Detailed Tables */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Detailed Breakdown</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Summary</h3>
              <div className="space-y-2">
                {Object.entries(reportData.departmentBreakdown).map(([dept, count]) => (
                  <div key={dept} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{dept}</span>
                    <span className="text-gray-600">{count} employees</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Plant Summary</h3>
              <div className="space-y-2">
                {Object.entries(reportData.plantBreakdown).map(([plant, count]) => (
                  <div key={plant} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{plant}</span>
                    <span className="text-gray-600">{count} employees</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Print Report
        </button>
        <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Schedule Report
        </button>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Generate PDF
        </button>
      </div>
    </div>
  )
}