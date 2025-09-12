'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PayrollDetail from '@/components/payroll/PayrollDetail'
import { initialPayrollEntries, PayrollEntry } from '@/lib/payrollData'

export default function PayrollDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [entry, setEntry] = useState<PayrollEntry | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = Number(params.id)
    
    // Simulate API call
    setTimeout(() => {
      const foundEntry = initialPayrollEntries.find(e => e.id === id)
      setEntry(foundEntry || null)
      setLoading(false)
    }, 500)
  }, [params.id])

  const handleBack = () => {
    router.push('/payroll')
  }

  const handleEdit = () => {
    router.push(`/payroll/edit/${params.id}`)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!entry) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Entry Not Found</h1>
          <p className="text-gray-600 mt-2">The requested payroll entry could not be found.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-gray-500 text-lg mb-4">Entry not found</div>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back to Payroll List
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PayrollDetail
        entry={entry}
        onEdit={handleEdit}
        onBack={handleBack}
      />
    </div>
  )
}