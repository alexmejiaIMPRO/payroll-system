'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import PayrollForm, { PayrollFormData } from '@/components/payroll/PayrollForm'
import { initialPayrollEntries, PayrollEntry } from '@/lib/payrollData'

export default function EditPayrollPage() {
  const router = useRouter()
  const params = useParams()
  const [entry, setEntry] = useState<PayrollEntry | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const id = Number(params.id)
    
    // Simulate API call
    setTimeout(() => {
      const foundEntry = initialPayrollEntries.find(e => e.id === id)
      setEntry(foundEntry || null)
      setLoading(false)
    }, 500)
  }, [params.id])

  const handleSubmit = async (formData: PayrollFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would make an API call here
      console.log('Updating payroll entry:', { id: params.id, ...formData })
      
      // Redirect to payroll detail
      router.push(`/payroll/${params.id}`)
    } catch (error) {
      console.error('Error updating payroll entry:', error)
      alert('Failed to update payroll entry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push(`/payroll/${params.id}`)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-10 bg-gray-200 rounded"></div>
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
            onClick={() => router.push('/payroll')}
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Edit Payroll Entry</h1>
        <p className="text-gray-600 mt-2">Update payroll information for {entry.employee.name}</p>
      </div>

      <PayrollForm
        initialData={entry}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={true}
      />

      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-900">Updating payroll entry...</span>
          </div>
        </div>
      )}
    </div>
  )
}