const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'
import { prisma } from '../../server/db/client'
import { trpc } from '../../utils/trpc'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userSession = await unstable_getServerSession(req, res, authOptions)

  const customer = await prisma.user.findUnique({
    where: { id: userSession?.user?.id },
    select: { stripeId: true },
  })
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer: customer?.stripeId,
        mode: 'setup',
        success_url:
          'http://localhost:3000/?success=true id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/?success=false',
      })
      res.redirect(303, session.url)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
