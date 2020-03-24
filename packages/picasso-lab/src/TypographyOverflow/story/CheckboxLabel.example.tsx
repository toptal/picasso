import React from 'react'
import { Typography, Checkbox } from '@toptal/picasso'
import { TypographyOverflow } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginTop: 100, maxWidth: '150px', flexBasis: '150px' }}>
        <Checkbox
          label={
            <TypographyOverflow>
              <Typography noWrap data-testid='ellipsed-text'>
                This typography is very long and therefore it overflows.
              </Typography>
            </TypographyOverflow>
          }
        />
      </div>
    </div>
  )
}

export default Example
