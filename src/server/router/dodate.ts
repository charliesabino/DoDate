import { createRouter } from './context'
import { prisma } from '../db/client'
import { z } from 'zod'

export const doDateRouter = createRouter()
  .query('get-doDates', {
    async resolve({ ctx }) {
      return prisma.doDate.findMany({
        where: { userId: ctx.session?.user?.id, done: false },
      })
    },
  })
  .query('get-status', {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      return prisma.doDate.findMany({
        where: { id: input.id },
        select: { overdue: true },
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
  .mutation('set-overdue', {
    input: z.object({ id: z.string(), overdue: z.boolean() }),
    async resolve({ input }) {
      const { id, overdue } = input
      return await prisma.doDate.update({
        where: {
          id,
        },
        data: {
          overdue,
        },
      })
    },
  })
  .mutation('create-doDate', {
    input: z.object({
      text: z.string(),
      dueDate: z.date(),
      userId: z.string(),
      stakes: z.number(),
    }),
    async resolve({ input }) {
      const { text, dueDate, userId, stakes } = input
      await prisma.doDate.create({
        data: {
          text,
          dueDate,
          userId,
          stakes,
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
