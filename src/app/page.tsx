'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface DashboardStats {
  totalEmployees: number
  totalPositions: number
  filledPositions: number
  totalPayroll: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    totalPositions: 0,
    filledPositions: 0,
    totalPayroll: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [employeesRes, positionsRes] = await Promise.all([
          fetch('/api/employees'),
          fetch('/api/positions')
        ])
        
        const employees = await employeesRes.json()
        const positions = await positionsRes.json()
        
        const totalPayroll = employees.reduce((sum: number, emp: any) => sum + emp.dailySalary, 0)
        const filledPositions = positions.filter((pos: any) => pos.isFilled).length
        
        setStats({
          totalEmployees: employees.length,
          totalPositions: positions.length,
          filledPositions,
          totalPayroll
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: '👥',
      color: 'bg-blue-500',
      href: '/employees'
    },
    {
      title: 'Total Positions',
      value: stats.totalPositions,
      icon: '💼',
      color: 'bg-green-500',
      href: '/positions'
    },
    {
      title: 'Filled Positions',
      value: stats.filledPositions,
      icon: '✅',
      color: 'bg-purple-500',
      href: '/positions'
    },
    {
      title: 'Daily Payroll',
      value: `$${stats.totalPayroll.toLocaleString()}`,
      icon: '💰',
      color: 'bg-orange-500',
      href: '/payroll'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to IMPRO ERP
        </h1>
        <p className="text-xl text-gray-600">
          Complete payroll and HR management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div className={`${card.color} p-3 rounded-full text-white text-2xl`}>
                  {card.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <Link href="/employees" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">👤</span>
                <div>
                  <p className="font-medium text-gray-900">Add New Employee</p>
                  <p className="text-sm text-gray-600">Register a new team member</p>
                </div>
              </div>
            </Link>
            <Link href="/positions" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💼</span>
                <div>
                  <p className="font-medium text-gray-900">Create Position</p>
                  <p className="text-sm text-gray-600">Define a new job role</p>
                </div>
              </div>
            </Link>
            <Link href="/payroll" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="font-medium text-gray-900">Process Payroll</p>
                  <p className="text-sm text-gray-600">Calculate employee payments</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            System Overview
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Employee Utilization</span>
              <span className="font-semibold">
                {stats.totalPositions > 0 ? Math.round((stats.filledPositions / stats.totalPositions) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ 
                  width: `${stats.totalPositions > 0 ? (stats.filledPositions / stats.totalPositions) * 100 : 0}%` 
                }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{stats.totalEmployees}</p>
                <p className="text-sm text-gray-600">Active Employees</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{stats.totalPositions - stats.filledPositions}</p>
                <p className="text-sm text-gray-600">Open Positions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}