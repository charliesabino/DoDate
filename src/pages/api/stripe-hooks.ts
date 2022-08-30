import { buffer } from 'micro'
import { prisma } from '../../server/db/client'
import { NextApiRequest, NextApiResponse } from 'next'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const config = { api: { bodyParser: false } }

export default async function webhookHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const reqBuffer = await buffer(req)
  const signature = req.headers['stripe-signature']
  const signingSecret = process.env.STRIPE_SIGNING_SECRET

  let event

  try {
    if (!signature || !signingSecret) return
    event = stripe.webhooks.constructEvent(reqBuffer, signature, signingSecret)
  } catch (err) {
    console.log(err)
    return res.status(400).send(`Webhook Error: ${err}`)
  }

  const { metadata } = event.data.object

  switch (event.type) {
    case 'charge.succeeded':
      // update user in prisma
      if (metadata?.userId && metadata?.courseId) {
        const user = await prisma.user.update({
          where: {
            id: metadata.userId,
          },
          data: {
            doDates: {
              connect: {
                id: metadata.doDateId,
              },
            },
          },
        })
      }
      break
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  res.send({ received: true })
}
