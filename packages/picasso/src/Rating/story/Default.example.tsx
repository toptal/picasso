import React, { ChangeEvent, useState } from 'react'
import { Container, Rating, Typography } from '@toptal/picasso'

const Example = () => {
  const [starsValue, setStarsValue] = useState(1)
  const [thumbsValue, setThumbsValue] = useState<boolean>()

  const onChangeStarsValue = (event: ChangeEvent<HTMLInputElement>) => {
    setStarsValue(Number(event.target.value))
  }

  return (
    <Container padded='small'>
      <Container bottom='medium'>
        <Typography size='medium' variant='heading'>
          Stars
        </Typography>
        <Rating
          onChange={onChangeStarsValue}
          name='rating'
          value={starsValue}
        />
      </Container>

      <Container>
        <Typography size='medium' variant='heading'>
          Thumbs
        </Typography>
        <Rating.Thumbs
          onChange={setThumbsValue}
          name='rating-thumbs'
          value={thumbsValue}
        />
      </Container>
    </Container>
  )
}

export default Example
