import React from 'react'
import { Container, TagSelector, Typography } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const value = [
  { value: 'AF', text: 'Afghanistan' },
  { value: 'AI', text: 'Aland Islands' },
  { value: 'ALB', text: 'Albania' },
]

const Example = () => {
  return (
    <Container flex direction='column'>
      <Container padded={SPACING_4}>
        <Typography>Default</Typography>
        <TagSelector placeholder='default' status='default' value={value} />
      </Container>
      <Container padded={SPACING_4}>
        <Typography>Error</Typography>
        <Container flex gap={'small'}>
          <TagSelector placeholder='error' status='error' value={value} />
          <TagSelector
            placeholder='error'
            status='error'
            value={[
              ...value,
              { value: 'CZE', text: 'Czech Republic', status: 'error' },
            ]}
          />
        </Container>
      </Container>
      <Container padded={SPACING_4}>
        <Typography>Success with long placeholder</Typography>
        <TagSelector placeholder='Very long placeholder' status='success' />
      </Container>
      <Container padded={SPACING_4}>
        <Typography>Success on one line</Typography>
        <TagSelector
          placeholder='success'
          status='success'
          value={value.slice(0, 2)}
        />
      </Container>
      <Container padded={SPACING_4}>
        <Typography>Success</Typography>
        <TagSelector placeholder='success' status='success' value={value} />
      </Container>
    </Container>
  )
}

export default Example
