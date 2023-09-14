import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import { Container, Rating, Typography } from '@toptal/picasso'
import { SPACING_4, SPACING_6, SPACING_10 } from '@toptal/picasso/utils'

const Example = () => {
  const [starsValue, setStarsValue] = useState(1)
  const [thumbsValue, setThumbsValue] = useState(true)

  const onChangeStarsValue = (event: ChangeEvent<HTMLInputElement>) => {
    setStarsValue(Number(event.target.value))
  }

  return (
    <Container padded={SPACING_4}>
      <Container bottom={SPACING_6}>
        <Typography size='medium' variant='heading'>
          Stars
        </Typography>
        <Rating.Stars
          onChange={onChangeStarsValue}
          name='rating'
          value={starsValue}
        />
      </Container>

      <Container>
        <Typography size='medium' variant='heading'>
          Thumbs
        </Typography>
        <Container flex>
          <Container right={SPACING_10}>
            <Rating.Thumbs
              onChange={setThumbsValue}
              name='rating-thumbs'
              value={thumbsValue}
            />
          </Container>
          <Rating.Thumbs
            onChange={() => setThumbsValue(!thumbsValue)}
            name='rating-thumbs-opposite'
            value={!thumbsValue}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
