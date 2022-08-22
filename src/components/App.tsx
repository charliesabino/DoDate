import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { HiOutlineBell, HiMenu, HiX } from 'react-icons/hi'
import { FiSettings, FiPlus, FiMenu, FiMoreHorizontal } from 'react-icons/fi'
import { getSession } from 'next-auth/react'
import { trpc } from '../utils/trpc'
import Image from 'next/future/image'
import { LogoLight } from './Logo'
import { useRef, useState, useEffect } from 'react'
import CreateDoDateForm from './CreateDoDateForm'
import { DoDate } from '@prisma/client'

const navigation = [
  // { name: 'Dashboard', href: '#', current: true },
  // { name: 'Team', href: '#', current: false },
  // { name: 'Projects', href: '#', current: false },
  // { name: 'Calendar', href: '#', current: false },
  // { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

const doDateNavigation = [
  { name: 'Edit DoDate', href: '#' },
  { name: 'Delete DoDate', href: '#' },
  // { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function App() {
  const session = trpc.useQuery(['auth.getSession'])
  const checkbox = useRef()
  const [checked, setChecked] = useState(false)
  const [selectedDoDates, setSelectedDoDates] = useState([])
  const user = session.data?.user

  const [doDates, setDoDates] = useState<DoDate[]>([])
  const deleteMutation = trpc.useMutation(['dodate.delete-doDate'])

  const { data, isLoading } = trpc.useQuery(['dodate.get-doDates'])

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
                    <div className='hidden md:block'>
                      <div className='ml-10 flex items-baseline space-x-4'>
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='hidden md:block'>
                    <div className='ml-4 flex items-center md:ml-6'>
                      <button
                        type='button'
                        className='bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                      >
                        <span className='sr-only'>View notifications</span>
                        <HiOutlineBell className='h-6 w-6' aria-hidden='true' />
                      </button>

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
                          <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
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
                <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
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
                    <button
                      type='button'
                      className='ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                    >
                      <span className='sr-only'>View notifications</span>
                      <HiOutlineBell className='h-6 w-6' aria-hidden='true' />
                    </button>
                  </div>
                  <div className='mt-3 px-2 space-y-1'>
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as='a'
                        href={item.href}
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
          <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
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
                <div className='mt-8 flex flex-col'>
                  <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                      <div className='relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                        <table className='min-w-full table-fixed divide-y divide-gray-300'>
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
                          <tbody className='divide-y divide-gray-200 bg-white'>
                            {doDates.map((doDate) => (
                              <tr
                                key={doDate.text}
                                className={
                                  selectedDoDates.includes(doDate)
                                    ? 'bg-gray-50'
                                    : undefined
                                }
                              >
                                <td className='relative w-12 px-6 sm:w-16 sm:px-8'>
                                  {selectedDoDates.includes(doDate) && (
                                    <div className='absolute inset-y-0 left-0 w-0.5 bg-blue-600' />
                                  )}
                                  <input
                                    type='checkbox'
                                    className='absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 sm:left-6'
                                    value={doDate.text}
                                    checked={selectedDoDates.includes(doDate)}
                                    onChange={(e) =>
                                      setSelectedDoDates(
                                        e.target.checked
                                          ? [...selectedDoDates, doDate]
                                          : selectedDoDates.filter(
                                              (p) => p !== doDate
                                            )
                                      )
                                    }
                                  />
                                </td>
                                <td
                                  className={classNames(
                                    'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                                    selectedDoDates.includes(doDates)
                                      ? 'text-blue-600'
                                      : 'text-gray-900'
                                  )}
                                >
                                  {doDate.text}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                  {doDate.dueDate.toLocaleTimeString([], {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </td>
                                <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                                  ${doDate.stakes}
                                </td>
                                <td className='whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                                  <Menu as='div' className='ml-3 relative '>
                                    <div>
                                      <Menu.Button className='max-w-xs text-gray-400 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                                        <span className='sr-only'>
                                          Open user menu
                                        </span>
                                          <FiMoreHorizontal className='h-6 w-6' />
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
                                      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50'>
                                        {doDateNavigation.map((item) => (
                                          <Menu.Item key={item.name}>
                                            {({ active }) => (
                                              <a
                                                href={item.href}
                                                className={classNames(
                                                  active ? 'bg-gray-100' : '',
                                                  'block px-4 py-2 text-sm text-gray-700'
                                                )}
                                              >
                                                {item.name}
                                              </a>
                                            )}
                                          </Menu.Item>
                                        ))}
                                      </Menu.Items>
                                    </Transition>
                                  </Menu>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
    </>
  )
}
