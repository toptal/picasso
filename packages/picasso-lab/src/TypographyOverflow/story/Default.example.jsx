import React from 'react'
import { Typography } from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <div style={{ width: 300, marginTop: 50 }}>
      <TypographyOverflow>
        <Typography noWrap>
          This typography is very long and therefore it overflows.
        </Typography>
      </TypographyOverflow>
    </div>
  )
}

export default Example
