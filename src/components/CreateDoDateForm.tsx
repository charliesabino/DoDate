import { trpc } from '../utils/trpc'
import { useState, useRef, Fragment } from 'react'
import { TimeInput } from '@mantine/dates'
import { TextInput, NumberInput } from '@mantine/core'
import { FiCalendar, FiDollarSign, FiClock, FiPlus } from 'react-icons/fi'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { DatePicker } from './DatePicker'
import { today, getLocalTimeZone } from '@internationalized/date'
import { Dialog, Transition } from '@headlessui/react'
import { OverlayProvider } from 'react-aria'

const CreateDoDateForm: React.FC = () => {
  const utils = trpc.useContext()

  const mutation = trpc.useMutation(['dodate.create-doDate'], {
    onSuccess() {
      utils.invalidateQueries(['dodate.get-doDates'])
    },
  })
  const [text, setText] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [dueDate, setDueDate] = useState<Date>(new Date())
  const [stakes, setStakes] = useState(0)

  const { data: session } = useSession()
  const userId = session?.user?.id as string

  const ref = useRef<HTMLInputElement>(null)
  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value)

  const handleDateTimeChange = (newVal: Date, preserve: Date) => {
    if (!newVal || !preserve) {
      return
    }
    newVal.setHours(preserve.getHours())
    newVal.setMinutes(preserve.getMinutes())
    setDueDate(newVal)
  }

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
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
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
                  <TextInput
                    label='Assignment name'
                    value={text}
                    onChange={onTextChange}
                    required
                    className='w-3/5'
                  />
                  <NumberInput
                    label='Stakes'
                    hideControls
                    className='w-3/5'
                    icon={<FiDollarSign />}
                    onChange={(val) => {
                      setStakes(val as number)
                    }}
                    required
                  />
                    <DatePicker
                      label='Due Date'
                      minValue={today(getLocalTimeZone())}
                      className='w-3/5'
                    />
                  <TimeInput
                    defaultValue={new Date()}
                    value={dueDate}
                    onChange={(date: Date) => {
                      handleDateTimeChange(dueDate, date)
                    }}
                    label='Time'
                    format='12'
                    amLabel='am'
                    pmLabel='pm'
                    required
                    clearable
                    icon={<FiClock />}
                    className='w-3/5'
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
