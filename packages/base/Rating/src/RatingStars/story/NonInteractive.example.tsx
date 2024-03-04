import React from 'react'
import { Container, Rating, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_6 } from '@toptal/picasso-utils'

const Example = () => {
  const value = 3

  return (
    <Container padded={SPACING_4}>
      <Container bottom={SPACING_6}>
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
