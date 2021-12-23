import React from 'react'
import { TreeNodeAvatar, Container, Typography } from '@toptal/picasso'

const Example = () => (
  <Container>
    <Container bottom='medium'>
      <TreeNodeAvatar name='John Doe' size='xsmall' />
    </Container>
    <Container bottom='medium'>
      <TreeNodeAvatar
        name='John Doe'
        src='jacqueline/128x128.jpg'
        size='small'
      />
    </Container>
    <Typography variant='heading' size='large'>
      objectFit
    </Typography>
    <Typography variant='heading' size='medium'>
      objectFit=contain (default)
    </Typography>
    <Container bottom='medium'>
      <TreeNodeAvatar
        name='John Doe'
        src='jacqueline/128x88.jpg'
        size='small'
      />
    </Container>
    <Container bottom='medium'>
      <TreeNodeAvatar
        name='John Doe'
        src='jacqueline/88x128.jpg'
        size='small'
      />
    </Container>
    <Typography variant='heading' size='medium'>
      objectFit=cover
    </Typography>
    <Container bottom='medium'>
      <TreeNodeAvatar
        name='John Doe'
        objectFit='cover'
        src='jacqueline/128x88.jpg'
        size='small'
      />
    </Container>
    <Container bottom='medium'>
      <TreeNodeAvatar
        name='John Doe'
        objectFit='cover'
        src='jacqueline/88x128.jpg'
        size='small'
      />
    </Container>
  </Container>
)

export default Example
