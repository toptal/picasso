import React from 'react'
import { Checkbox, Container, Typography } from '@toptal/picasso'
import { SPACING_2 } from '@toptal/picasso-utils'
import styled from 'styled-components'

const Label = styled.label`
  display: flex;
  cursor: pointer;
`

const CustomLabelExample = () => (
  <Container flex alignItems='center'>
    <Container right={SPACING_2} flex alignItems='center'>
      <Checkbox id='id-1' />
    </Container>
    <Label htmlFor='id-1'>
      <Typography weight='semibold' size='medium'>
        I have read through the Toptal Platform Training.
      </Typography>
    </Label>
  </Container>
)

export default CustomLabelExample
