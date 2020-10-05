import React from 'react'
import { Avatar, Container, Typography } from '@toptal/picasso'
import { OverlayBadge } from '@toptal/picasso-lab'

const Example = () => (
  <>
    <Container>
      <Typography variant='heading' size='small'>
        Small:
      </Typography>
    </Container>
    <Container top='small' bottom='medium'>
      <OverlayBadge content='2' variant='red' size='small'>
        <Avatar size='xxsmall' name='Jacqueline Roque' />
      </OverlayBadge>
    </Container>

    <Container>
      <Typography variant='heading' size='small'>
        Medium:
      </Typography>
    </Container>
    <Container top='small'>
      <OverlayBadge content='200' variant='red' size='medium'>
        <Avatar size='small' name='Adam Jones' />
      </OverlayBadge>
    </Container>
  </>
)

export default Example
