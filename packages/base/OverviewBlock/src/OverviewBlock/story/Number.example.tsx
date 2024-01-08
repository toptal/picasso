import React from 'react'
import { OverviewBlock } from '@toptal/picasso'

const NumberExample = () => {
  return (
    <OverviewBlock.Group>
      <OverviewBlock value='63' label='Pending tasks' variant='label-red' />
      <OverviewBlock value='0' label="Today's tasks" variant='label-red' />
      <OverviewBlock
        value='0'
        label="This week's tasks"
        variant='label-green'
      />
      <OverviewBlock value='63' label='Total tasks' />
      <OverviewBlock value='63' label='Playbook tasks' variant='label-yellow' />
    </OverviewBlock.Group>
  )
}

export default NumberExample
