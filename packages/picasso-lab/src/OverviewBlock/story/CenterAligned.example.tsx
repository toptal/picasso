import React from 'react'
import { OverviewBlock } from '@toptal/picasso-lab'

const CenterAlignedExample = () => {
  return (
    <OverviewBlock.Group>
      <OverviewBlock
        align='center'
        value='324'
        label='Users'
        variant='label-red'
      />
      <OverviewBlock
        align='center'
        value='51'
        label='Accounts'
        variant='label-green'
      />
    </OverviewBlock.Group>
  )
}

export default CenterAlignedExample
