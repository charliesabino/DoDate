import { createRouter } from './context'
import { prisma } from '../db/client'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const customerRouter = createRouter()
  .mutation('create-customer', {
    async resolve({ ctx }) {
      const customer = await stripe.customers.create({
        email: ctx.session?.user?.email,
      })
      await prisma.user.update({
        where: { id: ctx.session?.user?.id },
        data: {
          stripeId: customer.id,
        },
      })
    },
  })
  .query('get-customer', {
    async resolve({ ctx }) {
      return await prisma.user.findUnique({
        where: { id: ctx.session?.user?.id },
        select: { stripeId: true, email: true },
      })
    },
  })
