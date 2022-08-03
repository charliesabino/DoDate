import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { DoDate } from '@prisma/client'
import { useEffect, useState } from 'react'
import { signOut, signIn, useSession } from 'next-auth/react'
import DoDateItem from '../components/DoDateItem'

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

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(['dodate.get-doDates'])
  const [doDates, setDoDates] = useState<DoDate[]>([])
  const deleteMutation = trpc.useMutation(['dodate.delete-doDate'])

  useEffect(() => {
    if (data) {
      setDoDates(data)
    }
  }, [data])

  if (isLoading) return null

  // if (session) {
  return (
    <>
      <Head>
        <title>DoDate</title>
        <meta name='description' content='Hold yourself accountable.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className=''>
        <div className='w-full h-20 absolute top-0 flex justify-around items-center'>
          <h1 className='text-3xl font-bold'>DoDate</h1>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
        <div className='container mx-auto flex flex-col items-center justify-center h-screen p-4'>
          <CreateDoDateForm />
          {doDates.map((doDate) => (
            <DoDateItem
              key={doDate.id}
              doDate={doDate}
              onDelete={() => {
                deleteMutation.mutate({ ...doDate })
                setDoDates(doDates.filter((d) => d.id !== doDate.id))
              }}
            />
          ))}
        </div>
      </main>
    </>
  )
}
// return (
//   <>
//     <div className='flex flex-col items-center justify-center h-screen p-4'>
//       {' '}
//       <button
//         classname='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//         onclick={() => signin()}
//       >
//         sign in
//       </button>
//     </div>
//   </>
// )
// }

export default Home
