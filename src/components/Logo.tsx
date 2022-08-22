import { RiCalendarCheckLine } from 'react-icons/ri'

export function LogoDark(props) {
  return (
    <div {...props}>
      <h1 className='text-2xl font-semibold text-gray-900 flex items-center text-center'>
        {' '}
        <RiCalendarCheckLine className='text-blue-600 text-4xl' />
        Do<span className='text-blue-600'>Dates</span>
      </h1>
    </div>
  )
}

export function LogoLight(props) {
  return (
    <div {...props}>
      <h1 className='text-2xl font-semibold text-gray-300 flex items-center text-center'>
        {' '}
        <RiCalendarCheckLine className='text-blue-600 text-4xl' />
        Do<span className='text-blue-600'>Dates</span>
      </h1>
    </div>
  )
}
