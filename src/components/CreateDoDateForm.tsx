import { trpc } from '../utils/trpc'
import { useState, useRef } from 'react'
import { DatePicker } from '@mantine/dates'
import { TextInput, Button, Modal } from '@mantine/core'
import { FiCalendar } from 'react-icons/fi'
import dayjs from 'dayjs';

const CreateDoDateForm: React.FC = () => {
  const utils = trpc.useContext()

  const mutation = trpc.useMutation(['dodate.create-doDate'], {
    onSuccess() {
      utils.invalidateQueries(['dodate.get-doDates'])
    },
  })
  const [text, setText] = useState('')
  const [opened, setOpened] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value)

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    mutation.mutate({ text })
    setText('')
    setOpened(false)
  }

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <form
          className='mx-auto space-y-3 flex flex-col items-center'
          onSubmit={onSubmit}
        >
          <h1>Create a DoDate</h1>
          <TextInput
            label='Task name'
            value={text}
            onChange={onChange}
            required
            className='w-3/5'
          />
          <DatePicker
            inputFormat='MM/DD/YYYY'
            labelFormat='MM/YYYY'
            defaultValue={new Date()}
            label='Due date'
            required
            className='w-3/5'
            icon={<FiCalendar />}
            ref={ref}
            allowFreeInput
            minDate={dayjs(new Date()).toDate()}
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
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-6'
      >
        Add DoDate
      </button>
    </>
  )
}

export default CreateDoDateForm
