import clsx from 'clsx'

export const Container = ({ className, ...props }: {className: string, chidlren: Element[]}) => {
  return (
    <div
      className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
