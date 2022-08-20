import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../server/db/client'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
    async signIn({ user }) {
      setTimeout(async () => {
        if (typeof user.stripeId !== 'string') {
          const cutomer = await stripe.customers.create({ email: user?.email })
          await prisma.user.update({
            where: { email: user?.email as string },
            data: {
              stripeId: cutomer.id,
            },
          })
        }
      }, 1000)
      return true
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/login',
  },
}

export default NextAuth(authOptions)
