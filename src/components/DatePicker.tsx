import { useRef } from 'react'
import { useDatePickerState } from '@react-stately/datepicker'
import { useDatePicker } from '@react-aria/datepicker'
import { HiCalendar, HiExclamation } from 'react-icons/hi'
import { FieldButton } from './Button'
import { Calendar } from './Calendar'
import { DateField } from './DateField'
import { Popover } from './Popover'

export function DatePicker(props: any) {
  let state = useDatePickerState(props)
  let ref = useRef()
  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref)

  return (
    <div className='relative inline-flex flex-col text-left'>
      <span {...labelProps} className='block text-sm font-medium text-gray-700'>
        {props.label}
      </span>
      <div {...groupProps} ref={ref} className='flex group mt-1'>
        <div className='shadow-sm bg-white border border-gray-300 group-hover:border-gray-400 transition-colors rounded-l-md pr-8 group-focus-within:border-blue-600 group-focus-within:group-hover:border-blue-600 p-2 relative flex items-center'>
          <DateField {...fieldProps} />
          {state.validationState === 'invalid' && (
            <HiExclamation className='w-6 h-6 text-red-500 absolute right-1' />
          )}
        </div>
        <FieldButton {...buttonProps} isPressed={state.isOpen}>
          <HiCalendar className='w-5 h-5 text-gray-700 group-focus-within:text-blue-700' />
        </FieldButton>
      </div>
      {state.isOpen && (
          <Popover
            {...dialogProps}
            isOpen={state.isOpen}
            onClose={() => state.setOpen(false)}
          >
            <Calendar {...calendarProps} />
          </Popover>
      )}
    </div>
  )
}
