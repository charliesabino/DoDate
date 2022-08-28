import { trpc } from '../utils/trpc'
import { useState, useRef, Fragment } from 'react'
import { TextInput } from '@mantine/core'
import { FiPlus } from 'react-icons/fi'
import { useSession } from 'next-auth/react'
import { DatePicker } from './DatePicker'
import {
  today,
  getLocalTimeZone,
  now,
  parseZonedDateTime,
  parseAbsoluteToLocal,
} from '@internationalized/date'
import { Dialog, Transition } from '@headlessui/react'

const CreateDoDateForm: React.FC = () => {
  const utils = trpc.useContext()
  const mutation = trpc.useMutation(['dodate.create-doDate'], {
    onSuccess() {
      utils.invalidateQueries(['dodate.get-doDates'])
    },
  })
  const timeZone = getLocalTimeZone()

  const [text, setText] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [dueDate, setDueDate] = useState(now(getLocalTimeZone()).toDate())
  const [stakes, setStakes] = useState(0)

  const { data: session } = useSession()
  const userId = session?.user?.id as string

  const ref = useRef<HTMLInputElement>(null)
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value)

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    mutation.mutate({ text, dueDate, userId, stakes })
    setText('')
    setStakes(0)
    setIsOpen(false)
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Dialog.Panel className='w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <form
                  className='mx-auto space-y-3 flex flex-col items-center'
                  onSubmit={onSubmit}
                >
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Create a DoDate
                  </Dialog.Title>{' '}
                  <div className='w-3/5'>
                    <label className='block text-sm font-medium text-gray-700'>
                      Name
                    </label>
                    <div className='mt-1'>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        className='shadow-sm focus:ring-blue-500  focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        required
                        value={text}
                        onChange={onTextChange}
                      />
                    </div>
                  </div>{' '}
                  <div>
                    <label
                      htmlFor='price'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Late Penalty
                    </label>
                    <div className='mt-1 relative rounded-md shadow-sm'>
                      <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                        <span className='text-gray-500 sm:text-sm'>$</span>
                      </div>
                      <input
                        type='number'
                        name='price'
                        id='price'
                        className='focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md'
                        placeholder='0.00'
                        aria-describedby='price-currency'
                        required
                        value={stakes}
                        onChange={(e) => setStakes(parseFloat(e.target.value))}
                      />
                      <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                        <span
                          className='text-gray-500 sm:text-sm'
                          id='price-currency'
                        >
                          USD
                        </span>
                      </div>
                    </div>
                  </div>{' '}
                  <DatePicker
                    label='Due Date'
                    minValue={today(getLocalTimeZone())}
                    granularity='minute'
                    value={parseAbsoluteToLocal(dueDate.toISOString())}
                    onChange={(value) => {
                      setDueDate(value.toDate())
                    }}
                  />
                  <div className='flex justify-center space-x-2'>
                    <button
                      className='inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto'
                      type='submit'
                    >
                      Add
                    </button>
                    <button
                      className='inline-flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto'
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
      <button
        onClick={() => setIsOpen(true)}
        className='inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto'
      >
        <FiPlus className='text-2xl' /> Add DoDate
      </button>
    </>
  )
}

export default CreateDoDateForm
