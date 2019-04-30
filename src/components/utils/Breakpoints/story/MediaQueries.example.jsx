import React from 'react'
import styled from 'styled-components'
import { screens, palette } from '@toptal/picasso/utils'

const Box = ({ className }) => (
  <div className={className}>
    Box will become blue on small and medium screen sizes
  </div>
)

const StyledBox = styled(Box)`
  background-color: ${palette.success.main};
  padding: 2em;

  ${screens('small', 'medium')} {
    background-color: ${palette.primary.main};
  }
`

export default StyledBox
