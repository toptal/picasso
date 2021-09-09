import React from 'react'
import { OverviewBlock } from '@toptal/picasso-lab'

const CenterAlignedExample = () => {
  return (
    <OverviewBlock.Group align='center'>
      <OverviewBlock value='12345678' label='Label' variant='label-red' />
      <OverviewBlock
        value='$585,895,606.35'
        label='Paid'
        variant='label-green'
      />
    </OverviewBlock.Group>
  )
}

export default CenterAlignedExample
