import Image from 'next/future/image'

import { LogoDark } from '../components/Logo'
import backgroundImage from '../images/background-faqs.jpg'

export default function verifyRequest() {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <Image
        className='absolute w-full h-full z-0'
        src={backgroundImage}
        alt=''
        width={1558}
        height={946}
        unoptimized
      />
      <h1 className='relative text-center text-3xl'>
        An email has been sent with a link to log in.
      </h1>
      <LogoDark className='relative py-9' />
    </div>
  )
}
