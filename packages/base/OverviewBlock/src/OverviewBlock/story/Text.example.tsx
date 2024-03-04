import React from 'react'
import { OverviewBlock } from '@toptal/picasso'

const TextExample = () => {
  return (
    <OverviewBlock.Group>
      <OverviewBlock value='Active' label='Status' variant='value-green' />
      <OverviewBlock value='Developers' label='Interested In' />
      <OverviewBlock value='Ambiguous' label='Priority / Intent' />
      <OverviewBlock value='1968' label='Days in Funnel' />
    </OverviewBlock.Group>
  )
}

export default TextExample
