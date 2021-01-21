import React from 'react'
import { TypographyOverflow } from '@toptal/picasso-lab'

const Example = () => {
  return (
    <>
      <div
        style={{
          marginTop: 150,
          width: '300px',
          paddingRight: '20px',
          resize: 'horizontal',
          overflow: 'auto',
          borderRight: '3px solid black'
        }}
      >
        <TypographyOverflow
          lines={2}
          as='p'
          tooltipVariant='light'
          data-testid='ellipsed-text-lines2'
        >
          Two lines typography with a very long text and{' '}
          <a href='#'>two words link</a> and dynamic width. Try to resize.
        </TypographyOverflow>
      </div>
      <div
        style={{
          marginTop: '1rem',
          width: '300px',
          paddingRight: '20px',
          resize: 'horizontal',
          overflow: 'auto',
          borderRight: '3px solid black'
        }}
      >
        <TypographyOverflow
          lines={3}
          as='p'
          tooltipVariant='light'
          data-testid='ellipsed-text-lines3'
        >
          Three lines typography with a very long text and a very long text and{' '}
          a very long text and <a href='#'>two words link</a> and dynamic width.
          Try to resize.
        </TypographyOverflow>
      </div>
      <div
        style={{
          marginTop: '1rem',
          width: '300px',
          paddingRight: '20px',
          resize: 'horizontal',
          overflow: 'auto',
          borderRight: '3px solid black'
        }}
      >
        <TypographyOverflow
          lines={4}
          as='p'
          tooltipVariant='light'
          data-testid='ellipsed-text-lines4'
        >
          Four lines typography with a very long text and a very long text and a
          very long text and a very long text and a very long text and a very
          long text and a very long text and <a href='#'>two words link</a> and
          dynamic width. Try to resize.
        </TypographyOverflow>
      </div>
    </>
  )
}

export default Example
