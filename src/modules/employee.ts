import { prisma } from '@/lib/prisma'

export const EmployeeService = {
  async getAll() {
    return prisma.employee.findMany({ include: { position: true } })
  },
  async getById(id: number) {
    return prisma.employee.findUnique({ where: { id }, include: { position: true } })
  },
  async create(data: any){
    return prisma.employee.create({ data })
  },
  async update(id: number, data: any) {
    return prisma.employee.update({ where: { id }, data})
  },
  async delete(id: number){
    return prisma.employee.delete({ where: { id } })
  }
}
