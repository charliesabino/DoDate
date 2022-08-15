// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { useSession } from 'next-auth/react'
import { prisma } from '../../../server/db/client'

const chargeCard = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query

  const userId = session?.user?.id

  const doDate = await prisma.doDate.findUnique({
    where: { id: id.toString() },
    select: { stakes: true },
  })
}

export default chargeCard
