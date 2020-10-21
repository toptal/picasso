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
        <Typography inline weight='semibold'>
          bold
        </Typography>
        , or by{' '}
        <Typography inline color='green'>
          changing
        </Typography>{' '}
        its{' '}
        <Typography inline color='red'>
          color
        </Typography>
        .
      </Typography>
    </Container>
  </div>
)

export default Example
