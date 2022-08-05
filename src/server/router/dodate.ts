import { createRouter } from './context'
import { prisma } from '../db/client'
import { z } from 'zod'

export const doDateRouter = createRouter()
  .query('get-doDates', {
    async resolve() {
      return prisma.doDate.findMany({
        orderBy: {
          done: 'asc',
        },
      })
    },
  })
  .mutation('update-doDate', {
    input: z.object({ id: z.string(), done: z.boolean() }),
    async resolve({ input }) {
      const { id, done } = input
      return await prisma.doDate.update({
        where: {
          id,
        },
        data: {
          done,
        },
      })
    },
  })
  .mutation('create-doDate', {
    input: z.object({ text: z.string(), duedate: z.date() }),
    async resolve({ input }) {
      const { text, duedate } = input
      await prisma.doDate.create({
        data: {
          text,
          duedate,
        },
      })
    },
  })
  .mutation('delete-doDate', {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      const { id } = input
      return await prisma.doDate.delete({
        where: {
          id,
        },
      })
    },
  })
