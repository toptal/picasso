import React from 'react'
import { TypographyOverflow } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <>
      <div style={{ width: 300, marginTop: 100 }}>
        <TypographyOverflow data-testid='ellipsed-text'>
          This typography is very long and therefore it overflows.
        </TypographyOverflow>
      </div>
      <div style={{ width: '100%' }}>
        <TypographyOverflow data-testid='ellipsed-text-full-width'>
          Another typography is very long and has 100% width.
        </TypographyOverflow>
      </div>
    </>
  )
}

export default Example
