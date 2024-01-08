import React from 'react'
import { Checkbox, TypographyOverflow } from '@toptal/picasso'

const Example = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginTop: 100, maxWidth: '150px', flexBasis: '150px' }}>
        <Checkbox
          label={
            <TypographyOverflow data-testid='ellipsed-text'>
              This typography is very long and therefore it overflows.
            </TypographyOverflow>
          }
        />
      </div>
    </div>
  )
}

export default Example
