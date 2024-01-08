import React from 'react'
import { OverviewBlock } from '@toptal/picasso'

const DefaultExample = () => {
  const handleClick = (title: string) => {
    window.alert(`${title} clicked`)
  }

  return (
    <OverviewBlock.Group>
      <OverviewBlock
        value='4249'
        label='ACH'
        onClick={() => handleClick('ACH')}
      />
      <OverviewBlock
        value='19302'
        label='Credit Card'
        onClick={() => handleClick('Credit Card')}
      />
      <OverviewBlock
        value='979'
        label='PayPal'
        onClick={() => handleClick('PayPal')}
      />
      <OverviewBlock
        value='803'
        label='Wire'
        onClick={() => handleClick('Wire')}
      />
    </OverviewBlock.Group>
  )
}

export default DefaultExample
