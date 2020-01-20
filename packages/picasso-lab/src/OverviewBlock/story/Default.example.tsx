import React from 'react'
import { OverviewBlock } from '@toptal/picasso-lab'
import { Typography } from '@toptal/picasso'

const DefaultExample = () => {
  return (
    <OverviewBlock.Group>
      <OverviewBlock>
        <Typography size='large' weight='semibold' color='green'>
          Active
        </Typography>
        <Typography size='small'>Status</Typography>
      </OverviewBlock>

      <OverviewBlock>
        <Typography size='large' weight='semibold'>
          Developers
        </Typography>
        <Typography size='small'>Interested in</Typography>
      </OverviewBlock>

      <OverviewBlock>
        <Typography size='large' weight='semibold'>
          Ambiguous / No Intent
        </Typography>
        <Typography size='small'>Priority / intent</Typography>
      </OverviewBlock>

      <OverviewBlock>
        <Typography size='large' weight='semibold'>
          196
        </Typography>
        <Typography size='small'>Days</Typography>
      </OverviewBlock>
    </OverviewBlock.Group>
  )
}

export default DefaultExample
