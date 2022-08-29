import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import { CallToAction } from '../components/CallToAction'
import { Faqs } from '../components/Faqs'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { PrimaryFeatures } from '../components/PrimaryFeatures'
import App from '../components/App'
import { OverlayProvider } from 'react-aria'

const Home: NextPage = () => {
  const { data: session } = useSession()

  if (session) {
    return (
      <OverlayProvider>
        <App />
      </OverlayProvider>
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
