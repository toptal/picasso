import React from 'react'
import { Typography, Container } from '@toptal/picasso'

const Example = () => (
  <div>
    <Container bottom='small'>
      <Typography underline='solid'>solid</Typography>
    </Container>
    <Container bottom='small'>
      <Typography underline='dashed'>dashed</Typography>
    </Container>
    <Container bottom='small'>
      <Typography>
        This is how you can highlight text by making it{' '}
        <Typography as='span' inline weight='semibold'>
          bold
        </Typography>
        , or by{' '}
        <Typography as='span' inline color='green'>
          changing
        </Typography>{' '}
        its{' '}
        <Typography as='span' inline color='red'>
          color
        </Typography>
        .
      </Typography>
    </Container>
  </div>
)

export default Example
