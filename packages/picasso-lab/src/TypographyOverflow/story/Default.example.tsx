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
      <div
        style={{
          marginTop: '1rem',
          width: '500px',
          paddingRight: '20px',
          resize: 'horizontal',
          overflow: 'auto',
          borderRight: '3px solid black'
        }}
      >
        <TypographyOverflow data-testid='ellipsed-text-dynamic-width'>
          Another typography is very long and has dynamic width. Try to resize.
        </TypographyOverflow>
      </div>
    </>
  )
}

export default Example
