import { prisma } from '@/lib/prisma'

export const PositionService = {
  async getAll() {
    return prisma.position.findMany({ include: { employees: true } })
  },
  async getById(id: number) {
    return prisma.position.findUnique({ where: { id }, include: { employees: true } })
  },
  async create(data: any) {
    return prisma.position.create({ data })
  },
  async update(id: number, data: any) {
    return prisma.position.update({ where: { id }, data })
  },
  async delete(id: number) {
    return prisma.position.delete({ where: { id } })
  }
}

