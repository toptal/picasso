import React, { ChangeEvent, useState } from 'react'
import { Container, Rating, Typography } from '@toptal/picasso'

const Example = () => {
  const [smallValue, setSmallValue] = useState(1)
  const [largeValue, setLargeValue] = useState(1)

  const onChangeSmall = (event: ChangeEvent<HTMLInputElement>) => {
    setSmallValue(Number(event.target.value))
  }
  const onChangeLarge = (event: ChangeEvent<HTMLInputElement>) => {
    setLargeValue(Number(event.target.value))
  }

  return (
    <Container flex direction='column'>
      <Container padded='small'>
        <Typography variant='heading' size='small'>
          Small (default)
        </Typography>
        <Container top='small' bottom='small'>
          <Rating
            size='small'
            onChange={onChangeSmall}
            name='small-rating'
            value={smallValue}
          />
        </Container>
      </Container>
      <Container padded='small'>
        <Typography variant='heading' size='small'>
          Large
        </Typography>
        <Container top='small' bottom='small'>
          <Rating
            size='large'
            onChange={onChangeLarge}
            name='large-rating'
            value={largeValue}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default Example
