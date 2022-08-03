import { trpc } from '../utils/trpc'
import { DoDate } from '@prisma/client'
import classNames from 'classnames'

const DoDateItem: React.FC<{
  doDate: DoDate
  onDelete: () => void
}> = ({ doDate, onDelete }) => {
  const completeMutation = trpc.useMutation(['dodate.update-doDate'])

  const deleteMutation = trpc.useMutation(['dodate.delete-doDate'])

  const onChange = () => {
    doDate.done = !doDate.done
    completeMutation.mutate({ ...doDate })
  }

  return (
    <div key={doDate.id} className='flex gap-2 rounded p-4 md:w-1/2 w-full'>
      <input type='checkbox' checked={doDate.done} onChange={onChange}></input>
      <span className={classNames({ 'line-through': doDate.done })}>
        {doDate.text}
      </span>
      <button onClick={onDelete}>X</button>
    </div>
  )
}

export default DoDateItem
