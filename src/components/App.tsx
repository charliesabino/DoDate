import { Fragment, useCallback } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { HiOutlineBell, HiMenu, HiX } from 'react-icons/hi'
import { FiMenu, FiMoreHorizontal } from 'react-icons/fi'
import { trpc } from '../utils/trpc'
import Image from 'next/future/image'
import { LogoLight } from './Logo'
import DoDateComp from './DoDateComp'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import CreateDoDateForm from './CreateDoDateForm'
import { DoDate } from '@prisma/client'
import { signOut } from 'next-auth/react'
import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'

const userNavigation = [
  // { name: 'Your Profile', onClick: '' },
  // { name: 'Settings', onClick: '' },
  { name: 'Sign out', onClick: signOut },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const utils = trpc.useContext()

  const session = trpc.useQuery(['auth.getSession'])

  const paymentQuery: UseQueryResult<number, unknown> = useQuery('payments', async () => {
    const { data: payment } = await axios.get(`/api/fetch-payment`)
    return payment.paymentMethod.data.length as number
  })

  const user = session.data?.user

  const [doDates, setDoDates] = useState<DoDate[]>([])
  const deleteMutation = trpc.useMutation(['dodate.delete-doDate'])

  const { data } = trpc.useQuery(['dodate.get-doDates'])

  useEffect(() => {
    if (data) {
      setDoDates(data)
    }
  }, [data])

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full"> ``` */}
      <Head>
        <title>DoDate</title>
        <meta name='description' content='Hold yourself accountable.' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='min-h-full'>
        <Disclosure as='nav' className='bg-gray-800'>
          {({ open }) => (
            <>
              <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <LogoLight />
                    </div>
                    <div className='hidden md:block'></div>
                  </div>
                  <div className='hidden md:block'>
                    <div className='ml-4 flex items-center md:ml-6'>
                      {/*
                      <button
                        type='button'
                        className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                      >
                        <span className='sr-only'>View notifications</span>
                        <HiOutlineBell className='h-6 w-6' aria-hidden='true' />
                      </button> */}

                      {/* Profile dropdown */}
                      <Menu as='div' className='ml-3 relative'>
                        <div>
                          <Menu.Button className='max-w-xs text-gray-400 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                            <span className='sr-only'>Open user menu</span>
                            {typeof user?.image === 'string' ? (
                              <Image
                                className='h-8 w-8 rounded-full'
                                src={user?.image!}
                                width={50}
                                height={50}
                                alt='User Avatar'
                              />
                            ) : (
                              <FiMenu className='h-6 w-6' />
                            )}{' '}
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Menu.Items className='origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <div
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    <button onClick={item.onClick}>
                                      {item.name}
                                    </button>
                                  </div>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className='-mr-2 flex md:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <HiX className='block h-6 w-6' aria-hidden='true' />
                      ) : (
                        <HiMenu className='block h-6 w-6' aria-hidden='true' />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='md:hidden'>
                <div className='pt-4 pb-3 border-t border-gray-700'>
                  <div className='flex items-center px-5'>
                    <div className='flex-shrink-0'>
                      <Image
                        className='h-10 w-10 rounded-full'
                        src={user?.image!}
                        alt=''
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className='ml-3'>
                      <div className='text-base font-medium text-white'>
                        {user?.name}
                      </div>
                      <div className='text-sm font-medium text-gray-400'>
                        {user?.email}
                      </div>
                    </div>
                    {/*
                    <button
                      type='button'
                      className='ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    >
                      <span className='sr-only'>View notifications</span>
                      <HiOutlineBell className='h-6 w-6' aria-hidden='true' />
                    </button>
*/}
                  </div>
                  <div className='mt-3 px-2 space-y-1'>
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        className='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/*<header className='bg-white shadow-sm'>
          <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-lg leading-6 font-semibold text-gray-900'>
              Dashboard
            </h1>
          </div>
        </header>
*/}
        <main>
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative'>
            {/* Replace with your content */}
            <div className='px-4 py-4 sm:px-0'>
              <div className='px-4 sm:px-6 lg:px-8'>
                <div className='sm:flex sm:items-center'>
                  <div className='sm:flex-auto'>
                    <h1 className='text-xl font-semibold text-gray-900'>
                      Inbox
                    </h1>
                  </div>
                  <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
                    <CreateDoDateForm />
                  </div>
                </div>
                <div className='mt-8 flex flex-col relative'>
                  <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                      <div className='relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                        <table className='min-w-full table-fixed divide-y divide-gray-300 '>
                          <thead className='bg-gray-50'>
                            <tr>
                              <th
                                scope='col'
                                className='relative w-12 px-6 sm:w-16 sm:px-8'
                              ></th>
                              <th
                                scope='col'
                                className='min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900'
                              >
                                Title
                              </th>
                              <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                              >
                                Due Date
                              </th>
                              <th
                                scope='col'
                                className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                              >
                                Late Penalty
                              </th>
                              <th
                                scope='col'
                                className='relative py-3.5 pl-3 pr-4 sm:pr-6'
                              >
                                <span className='sr-only'>
                                  <FiMoreHorizontal />
                                </span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className='divide-y divide-gray-200 bg-white relative'>
                            {doDates.map((doDate) => (
                              <DoDateComp
                                key={doDate.id}
                                doDate={doDate}
                                onDelete={() => {
                                  deleteMutation.mutate({ ...doDate })
                                  setDoDates(
                                    doDates.filter((d) => d.id !== doDate.id)
                                  )
                                }}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-center w-full mt-4 text-lg'>
              {paymentQuery < 1 && (
                <span>
                  To get started,{' '}
                  <button className='border-b-blue-500 text-blue-500 border-b'>
                    add a payment method
                  </button>
                </span>
              )}
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}
