import { trpc } from '../utils/trpc'
import { useState, useRef } from 'react'
import { DatePicker, TimeInput } from '@mantine/dates'
import { TextInput, NumberInput, Modal } from '@mantine/core'
import { FiCalendar, FiDollarSign, FiClock, FiPlus } from 'react-icons/fi'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'

const CreateDoDateForm: React.FC = () => {
  const utils = trpc.useContext()

  const mutation = trpc.useMutation(['dodate.create-doDate'], {
    onSuccess() {
      utils.invalidateQueries(['dodate.get-doDates'])
    },
  })
  const [text, setText] = useState('')
  const [opened, setOpened] = useState(false)
  const [dueDate, setDueDate] = useState<Date>(new Date())
  const [stakes, setStakes] = useState(0)

  const { data: session } = useSession()
  const userId = session?.user?.id as string

  const ref = useRef<HTMLInputElement>(null)
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value)

  const handleDateTimeChange = (newVal: Date, preserve: Date) => {
    if (!newVal || !preserve) {
      return
    }
    newVal.setHours(preserve.getHours())
    newVal.setMinutes(preserve.getMinutes())
    setDueDate(newVal)
  }

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    mutation.mutate({ text, dueDate, userId, stakes })
    setText('')
    setStakes(0)
    setOpened(false)
  }

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form
          className='mx-auto space-y-3 flex flex-col items-center'
          onSubmit={onSubmit}
        >
          <h1 className='font-bold'>Create a DoDate</h1>
          <TextInput
            label='Assignment name'
            value={text}
            onChange={onTextChange}
            required
            className='w-3/5'
          />
          <NumberInput
            label='Stakes'
            hideControls
            className='w-3/5'
            icon={<FiDollarSign />}
            onChange={(val) => {
              setStakes(val as number)
            }}
            required
          />
          <DatePicker
            inputFormat='MM/DD/YYYY'
            defaultValue={new Date()}
            value={dueDate}
            onChange={(date) => {
              if (!date || !dueDate) {
                return
              }
              handleDateTimeChange(date, dueDate)
            }}
            label='Due date'
            required
            className='w-3/5'
            icon={<FiCalendar />}
            ref={ref}
            allowFreeInput
            minDate={dayjs(new Date()).toDate()}
          />
          <TimeInput
            defaultValue={new Date()}
            value={dueDate}
            onChange={(date: Date) => {
              handleDateTimeChange(dueDate, date)
            }}
            label='Time'
            format='12'
            amLabel='am'
            pmLabel='pm'
            required
            clearable
            icon={<FiClock />}
            className='w-3/5'
          />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            Add
          </button>
        </form>
      </Modal>
      <button
        onClick={() => setOpened(true)}
        className='flex items-center justify-between bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
      >
        <FiPlus className='text-2xl' /> Add DoDate
      </button>
    </>
  )
}

export default CreateDoDateForm
