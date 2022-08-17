import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { prisma } from '../../../server/db/client'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { doDateId } = req.query
    const doDate = await prisma.doDate.findUnique({
      where: { id: doDateId.toString() },
      select: { stakes: true },
    })

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

    const charge = await stripe.paymentIntents.create({
      amount: doDate.stakes * 100,
      currency: 'usd',
      payment_method_types: ['card'],
      customer: user?.stripeId,
      receipt_email: user?.email,
      payment_method: paymentMethod.data[0].id,
      confirm: true,
      off_session: true,
    })
    console.log(charge)
    console.log(paymentMethod)
    console.log(user)

    res.json({ id: charge.id })
  } catch (err) {
    res.send(err)
  } finally {
    await prisma.$disconnect()
  }
}
