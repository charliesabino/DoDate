import { trpc } from '../utils/trpc'
import { useState } from 'react'
import { Modal } from '@mantine/core'
import { FiSettings } from 'react-icons/fi'
import { signOut, signIn, useSession } from 'next-auth/react'
import Payment from './Payment'

const CreateDoDateForm: React.FC = () => {
  const [opened, setOpened] = useState(false)

  const { data: session } = useSession()

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <div className='mx-auto space-y-3 flex flex-col items-center'>
          <h1 className='font-bold'>Settings</h1>
          <Payment />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded'
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      </Modal>
      <button
        onClick={() => setOpened(true)}
        className='text-2xl font-bold py-2 px-4 m-6'
      >
        <FiSettings />
      </button>
    </>
  )
}

export default CreateDoDateForm
