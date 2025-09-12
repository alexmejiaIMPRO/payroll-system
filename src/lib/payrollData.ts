// Mock data for payroll system
export interface MockEmployee {
  id: number
  name: string
  position: string
  department: string
  plant: string
  dailySalary: number
}

export interface PayrollEntry {
  id: number
  employeeId: number
  employee: MockEmployee
  baseSalary: number
  deductions: number
  taxes: number
  bonuses: number
  netPay: number
  date: string
  status: 'pending' | 'approved' | 'paid'
}

export const mockEmployees: MockEmployee[] = [
  {
    id: 1,
    name: 'John Doe',
    position: 'Software Engineer',
    department: 'IT',
    plant: 'HQ',
    dailySalary: 100
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'HR Specialist',
    department: 'HR',
    plant: 'HQ',
    dailySalary: 80
  },
  {
    id: 3,
    name: 'Carlos Ruiz',
    position: 'Payroll Clerk',
    department: 'Finance',
    plant: 'Branch',
    dailySalary: 90
  },
  {
    id: 4,
    name: 'Maria Garcia',
    position: 'Quality Inspector',
    department: 'QCD',
    plant: 'PM',
    dailySalary: 85
  },
  {
    id: 5,
    name: 'David Wilson',
    position: 'Production Manager',
    department: 'MMD',
    plant: 'SSD',
    dailySalary: 120
  }
]

export const initialPayrollEntries: PayrollEntry[] = [
  {
    id: 1,
    employeeId: 1,
    employee: mockEmployees[0],
    baseSalary: 3000,
    deductions: 200,
    taxes: 300,
    bonuses: 100,
    netPay: 2600,
    date: '2024-01-15',
    status: 'paid'
  },
  {
    id: 2,
    employeeId: 2,
    employee: mockEmployees[1],
    baseSalary: 2400,
    deductions: 150,
    taxes: 200,
    bonuses: 0,
    netPay: 2050,
    date: '2024-01-15',
    status: 'approved'
  },
  {
    id: 3,
    employeeId: 3,
    employee: mockEmployees[2],
    baseSalary: 2700,
    deductions: 180,
    taxes: 250,
    bonuses: 50,
    netPay: 2320,
    date: '2024-01-15',
    status: 'pending'
  }
]

// Helper functions
export const calculateNetPay = (baseSalary: number, deductions: number, taxes: number, bonuses: number = 0): number => {
  return (baseSalary + bonuses) - (deductions + taxes)
}

export const getEmployeeById = (id: number): MockEmployee | undefined => {
  return mockEmployees.find(emp => emp.id === id)
}

export const calculateBaseSalary = (dailySalary: number, days: number = 30): number => {
  return dailySalary * days
}