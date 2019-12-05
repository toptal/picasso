import React from 'react'
import { CounterBlock } from '@toptal/picasso-lab'

const DefaultExample = () => {
  const handleClick = (title: string) => {
    window.alert(`${title} clicked`)
  }

  return (
    <CounterBlock.Group>
      <CounterBlock
        value='4249'
        label='ACH'
        onClick={() => handleClick('ACH')}
      />
      <CounterBlock
        value='19302'
        label='Credit Card'
        onClick={() => handleClick('Credit Card')}
      />
      <CounterBlock
        value='979'
        label='PayPal'
        onClick={() => handleClick('PayPal')}
      />
      <CounterBlock
        value='803'
        label='Wire'
        onClick={() => handleClick('Wire')}
      />
    </CounterBlock.Group>
  )
}

export default DefaultExample
