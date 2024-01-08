import React from 'react'
import { Stepper, Container } from '@toptal/picasso'
import styled from 'styled-components'

const StyledContainer = styled(Container)`
  width: 450px;
  border: 1px solid #000;
`

const Example = () => (
  <StyledContainer padded='medium'>
    <Stepper
      overflowEllipsis
      steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']}
    />
  </StyledContainer>
)

export default Example
