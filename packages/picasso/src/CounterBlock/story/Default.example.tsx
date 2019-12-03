/* global alert */
import React from 'react'
import { CounterBlock } from '@toptal/picasso'

const DefaultExample = () => {
  const handleClick = (title: string) => {
    alert(`${title} clicked`)
  }

  return (
    <CounterBlock.Group>
      <CounterBlock
        value='4249'
        title='ACH'
        onClick={() => handleClick('ACH')}
      />
      <CounterBlock
        value='19302'
        title='Credit Card'
        onClick={() => handleClick('Credit Card')}
      />
      <CounterBlock
        value='979'
        title='PayPal'
        onClick={() => handleClick('PayPal')}
      />
      <CounterBlock
        value='803'
        title='Wire'
        onClick={() => handleClick('Wire')}
      />
    </CounterBlock.Group>
  )
}

export default DefaultExample
