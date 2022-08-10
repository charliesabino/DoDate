import type { NextPage } from 'next'
import Head from 'next/head'
import { trpc } from '../utils/trpc'
import { DoDate } from '@prisma/client'
import { useEffect, useState } from 'react'
import { signOut, signIn, useSession } from 'next-auth/react'
import DoDateItem from '../components/DoDateItem'
import CreateDoDateForm from '../components/CreateDoDateForm'
import { FiCheckSquare } from 'react-icons/fi'
import { TailSpin } from 'react-loader-spinner'

const Home: NextPage = () => {
  const [doDates, setDoDates] = useState<DoDate[]>([])
  const deleteMutation = trpc.useMutation(['dodate.delete-doDate'])
  const { data: session } = useSession()
  const { data, isLoading } = trpc.useQuery(['dodate.get-doDates'])

  useEffect(() => {
    if (data) {
      setDoDates(data)
    }
  }, [data])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen w-screen'>
        <TailSpin
          height='80'
          width='80'
          color='black'
          ariaLabel='tail-spin-loading'
          radius='1'
          wrapperStyle={{}}
          wrapperClass=''
          visible={true}
        />{' '}
      </div>
    )
  }

  if (session) {
    return (
      <>
        <Head>
          <title>DoDate</title>
          <meta name='description' content='Hold yourself accountable.' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className=''>
          <div className='w-full h-20 absolute top-0 flex justify-around items-center'>
            <h1 className='text-3xl font-bold flex items-center'>
              <FiCheckSquare className='m-2' />
              DoDate
            </h1>
            <ul>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded'
                onClick={() => signOut()}
              >
                Sign Out
              </button>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded'>
                Add Credit Card
              </button>
            </ul>
          </div>
          <div className='container mx-auto flex flex-col items-center justify-top mt-16 h-screen p-4'>
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
            <CreateDoDateForm />
          </div>
        </main>
      </>
    )
  }
  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen p-4'>
        {' '}
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    </>
  )
}

export default Home
