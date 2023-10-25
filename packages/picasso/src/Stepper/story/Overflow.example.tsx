import React from 'react'
import { Stepper, Container } from '@toptal/picasso'
import styled from 'styled-components'
import { SPACING_6 } from '@toptal/picasso/utils'

const StyledContainer = styled(Container)`
  width: 450px;
  border: 1px solid #000;
`

const Example = () => (
  <StyledContainer padded={SPACING_6}>
    <Stepper
      overflowEllipsis
      steps={['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']}
    />
  </StyledContainer>
)

export default Example
