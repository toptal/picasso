import React from 'react'
import { Typography, Checkbox } from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <div style={{ marginTop: 100 }}>
      <Checkbox
        label={
          <TypographyOverflow>
            <Typography
              noWrap
              data-testid='ellipsed-text'
              style={{ width: 200 }}
            >
              This typography is very long and therefore it overflows.
            </Typography>
          </TypographyOverflow>
        }
      />
    </div>
  )
}

export default Example
