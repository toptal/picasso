import React from 'react'
import { TypographyOverflow } from '@toptal/picasso-lab'
import { Typography } from '@toptal/picasso'

const Example = () => {
  return (
    <div style={{ width: 300, marginTop: 100 }}>
      <TypographyOverflow
        data-testid='ellipsed-text'
        tooltipContent={
          <Typography color='yellow' weight='semibold'>
            This typography is very long and therefore it overflows.
          </Typography>
        }
      >
        This typography is very long and therefore it overflows.
      </TypographyOverflow>
    </div>
  )
}

export default Example
