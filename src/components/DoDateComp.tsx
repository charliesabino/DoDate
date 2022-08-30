import { trpc } from '../utils/trpc'
import { DoDate } from '@prisma/client'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiTrash2 } from 'react-icons/fi'

const doDateNavigation = [
  { name: 'Edit DoDate', href: '#' },
  { name: 'Delete DoDate', href: '#' },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const DoDateComp: React.FC<{
  doDate: DoDate
  onDelete: () => void
}> = ({ doDate, onDelete }) => {
  const utils = trpc.useContext()

  const completeMutation = trpc.useMutation(['dodate.update-doDate'], {
    onSuccess() {
      utils.invalidateQueries(['dodate.get-doDates'])
    },
  })
  const overdueMutation = trpc.useMutation(['dodate.set-overdue'])

  const processPayment = async () => {
    const { data } = await axios.get(`/api/charge-card/${doDate.id}`)
    console.log(data)
  }
  const onChange = () => {
    doDate.done = !doDate.done
    setTimeout(() => {
      completeMutation.mutate({ ...doDate })
    }, 1000)
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
        <span className={`${doDate.overdue && 'text-red-500'}`}>
          {doDate.dueDate.toLocaleTimeString([], {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        {doDate.overdue && <span className='text-red-500'>—Overdue</span>}
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
        ${doDate.stakes}
      </td>
      <td className='whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6'>
        {/*<Menu as='div' className='relative inline-block text-left'>
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
            <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
              {doDateNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
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
        */}
        <div className='max-w-xs text-gray-500 rounded-full flex items-center justift-between text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
          <button onClick={onDelete}>
            <FiTrash2 className='h-5 w-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white' />
          </button>
          {/*<button>
            <FiEdit className='h-6 w-6' />
          </button>*/}
        </div>
      </td>
    </tr>
  )
}

export default DoDateComp
