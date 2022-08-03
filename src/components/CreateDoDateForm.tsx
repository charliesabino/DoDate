import { trpc } from '../utils/trpc'
import { useState } from 'react'

const CreateDoDateForm: React.FC = () => {
  const utils = trpc.useContext()

  const mutation = trpc.useMutation(['dodate.create-doDate'], {
    onSuccess() {
      utils.invalidateQueries(['dodate.get-doDates'])
    },
  })
  const [text, setText] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value)

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    mutation.mutate({ text })
    setText('')
  }

  return (
    <form
      className='w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch'
      onSubmit={onSubmit}
    >
      <input
        className='border-2 rounded border-gray-600 p-1'
        type='text'
        placeholder='Create a new DoDate'
        onChange={onChange}
        value={text}
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        type='submit'
      >
        Submit
      </button>
    </form>
  )
}

export default CreateDoDateForm
