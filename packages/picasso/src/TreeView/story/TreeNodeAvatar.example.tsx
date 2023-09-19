import React from 'react'
import { TreeNodeAvatar, Container, Typography } from '@toptal/picasso'
import { SPACING_6 } from '@toptal/picasso/utils'

const Example = () => (
  <Container>
    <Container bottom={SPACING_6}>
      <TreeNodeAvatar name='John Doe' size='xsmall' />
    </Container>
    <Container bottom={SPACING_6}>
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
    <Container bottom={SPACING_6}>
      <TreeNodeAvatar
        name='John Doe'
        src='jacqueline/128x88.jpg'
        size='small'
      />
    </Container>
    <Container bottom={SPACING_6}>
      <TreeNodeAvatar
        name='John Doe'
        src='jacqueline/88x128.jpg'
        size='small'
      />
    </Container>
    <Typography variant='heading' size='medium'>
      objectFit=cover
    </Typography>
    <Container bottom={SPACING_6}>
      <TreeNodeAvatar
        name='John Doe'
        objectFit='cover'
        src='jacqueline/128x88.jpg'
        size='small'
      />
    </Container>
    <Container bottom={SPACING_6}>
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
