import Head from 'next/head'
import Link from 'next/link'

import { signIn, getCsrfToken, getProviders } from 'next-auth/react'
import { AuthLayout } from '../components/AuthLayout'
import { Button } from '../components/Button'
import { TextField } from '../components/Fields'
import { LogoDark } from '../components/Logo'
import { FcGoogle } from 'react-icons/fc'

export default function Login({ csrfToken, providers }: any) {
  return (
    <>
      <Head>
        <title>Sign In - DoDates</title>
      </Head>
      <AuthLayout>
        <div className='flex flex-col'>
          <Link href='/' aria-label='Home'>
            <LogoDark className='h-10 w-auto' />
          </Link>
          <div className='mt-20'>
            <h2 className='text-lg font-semibold text-gray-900'>
              Sign In / Sign Up
            </h2>
          </div>
        </div>
        <div className='mt-10 grid grid-cols-1 gap-y-8'>
          <form
            action='/api/auth/signin/email'
            method='post'
            className='grid grid-cols-1 gap-y-8'
          >
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <TextField
              label='Email address'
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
            />
            <Button
              type='submit'
              variant='solid'
              color='blue'
              className='w-full'
              href='/'
            >
              <span>
                Sign in / Sign up <span aria-hidden='true'>&rarr;</span>
              </span>
            </Button>
          </form>
          <span className='text-center'>or</span>
          {providers && (
            <div style={{ marginBottom: 0 }}>
              <Button
                variant='solid'
                className={'w-full'}
                href=''
                onClick={() =>
                  signIn(providers.google.id, {
                    callbackUrl: 'http://localhost:3000/',
                  })
                }
              >
                <FcGoogle className='pr-2 text-2xl' /> Continue with{' '}
                {providers.google.name}
              </Button>
            </div>
          )}
        </div>
      </AuthLayout>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const providers = await getProviders()
  const csrfToken = await getCsrfToken(context)
  return {
    props: {
      providers,
      csrfToken,
    },
  }
}
