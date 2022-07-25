import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }])

  return (
    <>
      <Head>
        <title>DoDate</title>
        <meta name='description' content='Hold youreslf accountable' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className=''></main>
    </>
  )
}

export const Todo = () => {

  const [todos, setTodos] = useState([])


  return <div>

  </div>
}

export default Home
