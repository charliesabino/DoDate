import { trpc } from '../utils/trpc'
import { DoDate } from '@prisma/client'
import { prisma } from '../server/db/client'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

// const chargeCard = async (doDate: DoDate) => {
//   const userSession = await getSession()

//   const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
//   const customer = await prisma.user.findUnique({
//     where: { id: userSession?.user?.id },
//     select: { stripeId: true },
//   })
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: doDate.stakes * 100,
//     currency: 'usd',
//     payment_method_types: ['card'],
//     customer: customer?.stripeId,
//   })
//   return paymentIntent
// }

const DoDateItem: React.FC<{
  doDate: DoDate
  onDelete: () => void
}> = ({ doDate, onDelete }) => {
  const completeMutation = trpc.useMutation(['dodate.update-doDate'])

  const onChange = () => {
    doDate.done = !doDate.done
    completeMutation.mutate({ ...doDate })
  }
  const [currentDate, setCurrentDate] = useState(new Date())
  const [overDue, setOverDue] = useState(false)
  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
  }, [])
  let active = true
  if (doDate.dueDate < currentDate) {
    active = false
  }
  useEffect(() => {
    if (!active) {
      setOverDue(true)
    }
  }, [doDate, active])
  return (
    <div
      key={doDate.id}
      className='flex justify-between items-center gap-2 rounded p-4 w-1/2 border-b border-gray-300'
    >
      <ul>
        <input
          type='checkbox'
          checked={doDate.done}
          onChange={onChange}
        ></input>
        {doDate.done ? (
          <>
            <span className='line-through text-xl px-4'>{doDate.text}</span>
          </>
        ) : (
          <>
            <span className='text-xl px-4'>{doDate.text}</span>
          </>
        )}
      </ul>
      <ul>
        <span>${doDate.stakes}</span>
        {overDue ? (
          <>
            <span className='text-red-400 px-4'>
              {doDate.dueDate.toLocaleDateString()}
            </span>{' '}
            <span className='px-4 text-red-400'>
              {doDate.dueDate.toLocaleTimeString()}
            </span>
            <span className='px-4 text-red-400'>Overdue</span>
          </>
        ) : (
          <>
            <span className='px-4'>{doDate.dueDate.toLocaleDateString()}</span>{' '}
            <span className='px-4'>{doDate.dueDate.toLocaleTimeString()}</span>
          </>
        )}

        <button
          onClick={onDelete}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
        >
          X
        </button>
      </ul>
    </div>
  )
}

export default DoDateItem
