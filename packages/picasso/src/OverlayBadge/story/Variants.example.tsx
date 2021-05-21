import React from 'react'
import { Avatar, Container, Typography, OverlayBadge } from '@toptal/picasso'

const Example = () => (
  <>
    <Container>
      <Typography variant='heading' size='small'>
        White:
      </Typography>
    </Container>
    <Container top='small' bottom='medium'>
      <OverlayBadge content='1' variant='white'>
        <Avatar name='Jacqueline Roque' />
      </OverlayBadge>
    </Container>
    <Container>
      <Typography variant='heading' size='small'>
        Red:
      </Typography>
    </Container>
    <Container top='small'>
      <OverlayBadge content='100' variant='red'>
        <Avatar name='Adam Jones' />
      </OverlayBadge>
    </Container>
  </>
)

export default Example
