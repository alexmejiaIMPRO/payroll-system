'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PayrollForm, { PayrollFormData } from '@/components/payroll/PayrollForm'
import { mockEmployees, getEmployeeById } from '@/lib/payrollData'

export default function NewPayrollPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: PayrollFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would make an API call here
      console.log('Creating payroll entry:', formData)
      
      // Redirect to payroll list
      router.push('/payroll')
    } catch (error) {
      console.error('Error creating payroll entry:', error)
      alert('Failed to create payroll entry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    router.push('/payroll')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create Payroll Entry</h1>
        <p className="text-gray-600 mt-2">Add a new payroll entry for an employee</p>
      </div>

      <PayrollForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={false}
      />

      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-900">Creating payroll entry...</span>
          </div>
        </div>
      )}
    </div>
  )
}