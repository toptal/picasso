import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { OverlayLoader } from '@toptal/picasso-lab'

const Content = () => {
  return (
    <Container>
      <Typography>
        There is some content loading here and the OverlayLoader is displayed on
        top to mark that the content is not ready to be interacted with yet{' '}
      </Typography>
    </Container>
  )
}

const Example = () => (
  <Container flex>
    <Container style={{ width: 200, position: 'relative' }} right='medium'>
      <Content />
      <OverlayLoader size='small' />
    </Container>

    <Container style={{ width: 200, position: 'relative' }} right='medium'>
      <Content />
      <OverlayLoader size='medium' />
    </Container>

    <Container style={{ width: 200, position: 'relative' }}>
      <Content />
      <OverlayLoader size='large' />
    </Container>
  </Container>
)

export default Example
