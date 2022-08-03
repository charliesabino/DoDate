import { trpc } from '../utils/trpc'
import { DoDate } from '@prisma/client'
import { DatePicker } from '@mantine/dates'

const DoDateItem: React.FC<{
  doDate: DoDate
  onDelete: () => void
}> = ({ doDate, onDelete }) => {
  const completeMutation = trpc.useMutation(['dodate.update-doDate'])

  const onChange = () => {
    doDate.done = !doDate.done
    completeMutation.mutate({ ...doDate })
  }

  return (
    <div
      key={doDate.id}
      className='flex justify-between items-center gap-2 rounded p-4 w-1/2'
    >
      <ul>
        <input
          type='checkbox'
          checked={doDate.done}
          onChange={onChange}
        ></input>
        {doDate.done ? (
          <span className='line-through text-xl px-4'>{doDate.text}</span>
        ) : (
          <span className='text-xl px-4'>{doDate.text}</span>
        )}
      </ul>
      <button
        onClick={onDelete}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
      >
        X
      </button>
    </div>
  )
}

export default DoDateItem
