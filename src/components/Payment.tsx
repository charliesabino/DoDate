import React from 'react'

export default function Payment() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)
    if (query.get('success')) {
      console.log('Card added successfully')
    }

    if (query.get('canceled')) {
      console.log('Card add canceled')
    }
  }, [])

  return (
    <form action='/api/checkout_sessions' method='POST'>
      <section>
        <span>
          To get started,{' '}
          <button
            type='submit'
            role='link'
            className='border-b-blue-500 text-blue-500 border-b'
          >
            add a payment method
          </button>
        </span>
      </section>
    </form>
  )
}
