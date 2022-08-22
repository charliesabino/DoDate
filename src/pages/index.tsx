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
import Settings from '../components/Settings'
import { CallToAction } from '../components/CallToAction'
import { Faqs } from '../components/Faqs'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Pricing } from '../components/Pricing'
import { PrimaryFeatures } from '../components/PrimaryFeatures'
import { SecondaryFeatures } from '../components/SecondaryFeatures'
import { Testimonials } from '../components/Testimonials'
import App from '../components/App'

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
        <App/>
      </>
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
            <ul className='flex'>
              <Settings />
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
      <Head>
        <title>DoDate</title>
        <meta name='description' content='Hold yourself accountable.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <Faqs />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}

export default Home
