import React from 'react'
import { TypographyOverflow } from '@toptal/picasso-lab'
import styled from 'styled-components'
import { Container } from '@toptal/picasso'

const DynamicWidthContainer = styled(Container)`
  margin-top: 1rem;
  width: 300px;
  padding-right: 20px;
  resize: horizontal;
  overflow: auto;
  border-right: 3px solid black;
`

const Example = () => {
  return (
    <>
      <DynamicWidthContainer style={{ marginTop: 150 }}>
        <TypographyOverflow lines={2} as='p' tooltipVariant='light'>
          Two lines typography with a very long text and{' '}
          <a href='#'>two words link</a> and dynamic width. Try to resize.
        </TypographyOverflow>
      </DynamicWidthContainer>
      <DynamicWidthContainer>
        <TypographyOverflow lines={3} as='p' tooltipVariant='light'>
          Three lines typography with a very long text and a very long text and{' '}
          a very long text and <a href='#'>two words link</a> and dynamic width.
          Try to resize.
        </TypographyOverflow>
      </DynamicWidthContainer>
      <DynamicWidthContainer>
        <TypographyOverflow lines={4} as='p' tooltipVariant='light'>
          &lt;https://longlong.longlong.html/very/long/html/link/very/long/html/link/&gt;
          Four lines typography with a very long text and a very long text and a
          very long text and a very long text and a very long text and a very
          long text and a very long text and <a href='#'>two words link</a> and
          dynamic width. Try to resize.
        </TypographyOverflow>
      </DynamicWidthContainer>
    </>
  )
}

export default Example
