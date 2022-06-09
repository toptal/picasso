import React from 'react'
import { Container, TagSelector, Typography } from '@toptal/picasso'

const value = [
  { value: 'AF', text: 'Afghanistan' },
  { value: 'AI', text: 'Aland Islands' },
  { value: 'ALB', text: 'Albania' },
]

const Example = () => {
  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Typography>Default</Typography>
        <TagSelector placeholder='default' status='default' value={value} />
      </Container>
      <Container padded='small'>
        <Typography>Error</Typography>
        <TagSelector placeholder='error' status='error' value={value} />
      </Container>
      <Container padded='small'>
        <Typography>Success</Typography>
        <TagSelector placeholder='success' status='success' value={value} />
      </Container>
    </Container>
  )
}

export default Example
