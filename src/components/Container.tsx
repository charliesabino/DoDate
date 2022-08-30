import clsx from 'clsx'
import { ReactElement } from 'react'

export const Container: React.FC<{
  className: string
  children: ReactElement
}> = ({ className, children, ...props }) => {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
