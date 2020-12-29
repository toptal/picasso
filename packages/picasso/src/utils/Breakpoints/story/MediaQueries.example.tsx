import React from 'react'
import styled from 'styled-components'
import { screens, palette } from '@toptal/picasso/utils'

const StyledBox = styled.div`
  background-color: ${palette.green.main};
  padding: 2rem;

  ${screens('small', 'medium')} {
    background-color: ${palette.blue.main};
  }
`

const Example = () => (
  <StyledBox>Box will become blue on small and medium screen sizes</StyledBox>
)

export default Example
