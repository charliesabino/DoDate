import Image from 'next/future/image'

import { Container } from './Container'
import backgroundImage from '../images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'Does DoDates cost money?',
      answer:
        'Well, it depends—if you accomplish what you set out to do, it is free. However, if you fail to meet your deadlines, you will be billed whatever you decided at task creation.',
    },
  ],
  [
    {
      question: 'Does DoDates have a mobile app?',
      answer: 'Not yet, but we are working on it!',
    },
  ],
  [
    {
      question: 'What does DoDates do with my payment information?',
      answer:
        'We have do not have access to your payment methods—it is handled by Stripe.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id='faq'
      aria-labelledby='faq-title'
      className='relative overflow-hidden bg-slate-50 py-20 sm:py-32'
    >
      <Image
        className='absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4'
        src={backgroundImage}
        alt=''
        width={1558}
        height={946}
        unoptimized
      />
      <Container className='relative'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2
            id='faq-title'
            className='font-display text-3xl tracking-tight text-slate-900 sm:text-4xl'
          >
            Frequently asked questions
          </h2>
          <p className='mt-4 text-lg tracking-tight text-slate-700'>
            If you can’t find what you’re looking for, email support@dodate.app
          </p>
        </div>
        <ul
          role='list'
          className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3'
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role='list' className='flex flex-col gap-y-8'>
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className='font-display text-lg leading-7 text-slate-900'>
                      {faq.question}
                    </h3>
                    <p className='mt-4 text-sm text-slate-700'>{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
