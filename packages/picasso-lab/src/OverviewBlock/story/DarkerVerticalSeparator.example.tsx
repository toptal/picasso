import React from 'react'
import { OverviewBlock } from '@toptal/picasso-lab'

const DarkerVerticalSeparator = () => {
  return (
    <OverviewBlock.Group>
      <OverviewBlock hasDarkerVerticalSeparator value='4249' label='ACH' />
      <OverviewBlock
        hasDarkerVerticalSeparator
        value='19302'
        label='Credit Card'
      />
      <OverviewBlock hasDarkerVerticalSeparator value='979' label='PayPal' />
      <OverviewBlock hasDarkerVerticalSeparator value='803' label='Wire' />
    </OverviewBlock.Group>
  )
}

export default DarkerVerticalSeparator
