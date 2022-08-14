// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../server/db/client'

const chargeCard = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  const doDate = await prisma.doDate.findUnique({
    where: { id: id },
  })
}

export default chargeCard
