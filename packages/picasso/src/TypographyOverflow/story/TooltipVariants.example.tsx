import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'

const Example = () => {
  return (
    <div style={{ width: 300, marginTop: 100 }}>
      <TypographyOverflow data-testid='ellipsed-text-dark'>
        Dark tooltip. This typography is very long and therefore it overflows.
      </TypographyOverflow>
      <TypographyOverflow data-testid='ellipsed-text-light'>
        Light tooltip. This typography is very long and therefore it overflows.
      </TypographyOverflow>
    </div>
  )
}

export default Example
