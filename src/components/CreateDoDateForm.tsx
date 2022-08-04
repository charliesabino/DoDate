import { trpc } from '../utils/trpc'
import { useState } from 'react'
import { DatePicker } from '@mantine/dates'
import { TextInput, Button, Modal } from '@mantine/core'

const CreateDoDateForm: React.FC = () => {
  const utils = trpc.useContext()

  const mutation = trpc.useMutation(['dodate.create-doDate'], {
    onSuccess() {
      utils.invalidateQueries(['dodate.get-doDates'])
    },
  })
  const [text, setText] = useState('')
  const [opened, setOpened] = useState(false)

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
          className='w-full mx-auto space-y-3 flex flex-col items-center'
          onSubmit={onSubmit}
        >
          <TextInput
            label='Task name'
            value={text}
            onChange={onChange}
            required
            className='w-3/4'
          />
          <DatePicker
            inputFormat='MM/DD/YYYY'
            labelFormat='MM/YYYY'
            defaultValue={new Date()}
            label='Due date'
            required
            className=''
            dayClassName={}
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
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Add DoDate
      </button>
    </>
  )
}

export default CreateDoDateForm
