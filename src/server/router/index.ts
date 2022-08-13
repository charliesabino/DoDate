// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { authRouter } from './auth'
import { doDateRouter } from './dodate'
import { customerRouter } from './customer'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('auth.', authRouter)
  .merge('dodate.', doDateRouter)
  .merge('customer.', customerRouter)

// export type definition of API
export type AppRouter = typeof appRouter
