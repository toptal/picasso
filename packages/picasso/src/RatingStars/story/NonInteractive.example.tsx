import React from 'react'
import { Container, Rating, Typography } from '@toptal/picasso'

const Example = () => {
  const value = 3

  return (
    <Container padded='small'>
      <Container bottom='medium'>
        <Typography size='medium' variant='heading'>
          Stars
        </Typography>
        <Rating.Stars interactive={false} name='rating' value={value} />
      </Container>

      <Container>
        <Typography size='medium' variant='heading'>
          Thumbs
        </Typography>
        <Rating.Thumbs interactive={false} name='rating-thumbs' value={false} />
      </Container>
    </Container>
  )
}

export default Example
