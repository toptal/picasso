import React from 'react'
import { OverviewBlock } from '@toptal/picasso-lab'

const CenterAlignedExample = () => {
  return (
    <OverviewBlock.Group align='center'>
      <OverviewBlock value='324' label='Users' variant='label-red' />
      <OverviewBlock value='51' label='Accounts' variant='label-green' />
    </OverviewBlock.Group>
  )
}

export default CenterAlignedExample
