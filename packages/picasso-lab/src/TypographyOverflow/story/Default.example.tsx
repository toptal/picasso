import React from 'react'
import { TypographyOverflow } from '@toptal/picasso-lab'
import styled from 'styled-components'
import { Container } from '@toptal/picasso'

const DynamicWidthContainer = styled(Container)`
  margin-top: 1rem;
  width: 500px;
  padding-right: 20px;
  resize: horizontal;
  overflow: auto;
  border-right: 3px solid black;
`

const Example = () => {
  return (
    <>
      <div style={{ width: 300, marginTop: 100 }}>
        <TypographyOverflow data-testid='ellipsed-text'>
          This typography is very long and therefore it overflows.
        </TypographyOverflow>
      </div>
      <DynamicWidthContainer>
        <TypographyOverflow data-testid='ellipsed-text-dynamic-width'>
          Another typography is very long and has dynamic width. Try to resize.
        </TypographyOverflow>
      </DynamicWidthContainer>
    </>
  )
}

export default Example
