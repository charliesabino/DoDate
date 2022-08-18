import { trpc } from '../utils/trpc'
import { DoDate } from '@prisma/client'
import { useState, useEffect } from 'react'
import axios from 'axios'

const DoDateItem: React.FC<{
  doDate: DoDate
  onDelete: () => void
}> = ({ doDate, onDelete }) => {
  const completeMutation = trpc.useMutation(['dodate.update-doDate'])
  const overdueQuery = trpc.useQuery(['dodate.get-status', { id: doDate.id }])
  const overdueMutation = trpc.useMutation(['dodate.set-overdue'])

  const processPayment = async () => {
    const { data } = await axios.get(`/api/charge-card/${doDate.id}`)
    console.log(data)
  }
  const onChange = () => {
    doDate.done = !doDate.done
    completeMutation.mutate({ ...doDate })
  }

  const [currentDate, setCurrentDate] = useState(new Date())
  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
  }, [])
  if (doDate.dueDate < currentDate && !doDate.overdue) {
    doDate.overdue = true
    overdueMutation.mutate({ ...doDate })
    processPayment()
  }
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
        {doDate.overdue ? (
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
        <button onClick={processPayment}>charge</button>
      </ul>
    </div>
  )
}

export default DoDateItem
