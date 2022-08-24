import { trpc } from '../utils/trpc'
import { Fragment } from 'react'
import { DoDate } from '@prisma/client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiMoreHorizontal } from 'react-icons/fi'
import { Menu, Transition } from '@headlessui/react'

const doDateNavigation = [
  { name: 'Edit DoDate', href: '#' },
  { name: 'Delete DoDate', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DoDateComp: React.FC<{
  doDate: DoDate
  onDelete: () => void
}> = ({ doDate, onDelete }) => {
  const completeMutation = trpc.useMutation(['dodate.update-doDate'])
  const overdueMutation = trpc.useMutation(['dodate.set-overdue'])

  const processPayment = async () => {
    const { data } = await axios.get(`/api/charge-card/${doDate.id}`)
    console.log(data)
  }
  const onChange = () => {
    doDate.done = !doDate.done
    completeMutation.mutate({ ...doDate })
  }

  const [currentDate, setCurrentDate] = useState(new Date())
  useEffect(() => {
    setInterval(() => {
      setCurrentDate(new Date())
    }, 1000)
  }, [])

  if (doDate.dueDate < currentDate && !doDate.overdue) {
    doDate.overdue = true
    overdueMutation.mutate({ ...doDate })
    processPayment()
  }
  return (
    <tr key={doDate.text}>
      <td className='relative w-12 px-6 sm:w-16 sm:px-8'>
        <input
          type='checkbox'
          className='absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 sm:left-6'
          onChange={onChange}
        />
      </td>
      <td className='whitespace-nowrap py-4 pr-3 text-sm font-medium'>
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
      <td className='whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
        <Menu as='div' className='ml-3 relative '>
          <div>
            <Menu.Button className='max-w-xs text-gray-400 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
              <span className='sr-only'>Open DoDate Menu</span>
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
            <Menu.Items className='origin-top-right absolute z-50 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
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
  )
}

export default DoDateComp
