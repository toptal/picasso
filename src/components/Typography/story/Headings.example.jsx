import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const TypographyHeadingsExample = () => (
  <div>
    <Container bottom='small'>
      <Typography variant='h1'>Heading 1</Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='h2'>Heading 2</Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='h3'>Heading 3</Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='h4'>Heading 4</Typography>
    </Container>
    <Container bottom='small'>
      <Typography variant='h5'>Heading 5</Typography>
    </Container>
    <Typography variant='h6'>Heading 6</Typography>
  </div>
)

export default TypographyHeadingsExample
