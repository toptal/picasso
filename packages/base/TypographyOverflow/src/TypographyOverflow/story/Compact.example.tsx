import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'

const Example = () => {
  return (
    <div style={{ width: 300, marginTop: 100 }}>
      <TypographyOverflow compact data-testid='compact-tooltip'>
        This typography is very long and therefore it overflows.
      </TypographyOverflow>
    </div>
  )
}

export default Example
