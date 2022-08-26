import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { prisma } from './../../server/db/client'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    const userSession = await unstable_getServerSession(req, res, authOptions)

    const user = await prisma.user.findUnique({
      where: { id: userSession?.user?.id },
      select: { email: true, stripeId: true },
    })

    const paymentMethod = await stripe.customers.listPaymentMethods(
      user?.stripeId,
      {
        type: 'card',
      }
    )

    res.json({ paymentMethod })
  } catch (err) {
    res.send(err)
  } finally {
    await prisma.$disconnect()
  }
}
