import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import styled from 'styled-components'

const BoldConteiner = styled(Container)`
  font-weight: bold;
`

const LighterConteiner = styled(Container)`
  font-weight: lighter;
`

const Example = () => (
  <div>
    <Container bottom='small'>
      <Typography weight='thin'>Thin</Typography>
    </Container>
    <Container bottom='small'>
      <Typography weight='light'>Light</Typography>
    </Container>
    <Container bottom='small'>
      <Typography weight='regular'>Regular</Typography>
    </Container>
    <Container bottom='small'>
      <Typography weight='semibold'>Semibold</Typography>
    </Container>
    <BoldConteiner bottom='small'>
      <Typography weight='inherit'>Inherit Bold</Typography>
    </BoldConteiner>
    <LighterConteiner>
      <Typography weight='inherit'>Inherit Lighter</Typography>
    </LighterConteiner>
  </div>
)

export default Example
