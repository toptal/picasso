import React, { ChangeEvent, useState } from 'react'
import { Container, Rating, Typography } from '@toptal/picasso'

const Example = () => {
  const [smallValue, setSmallValue] = useState(1)
  const [largeValue, setLargeValue] = useState(1)

  const [thumbsLargeValue, setThumbsLargeValue] = useState<boolean>()
  const [thumbsSmallValue, setThumbsSmallValue] = useState<boolean>()

  const onChangeSmall = (event: ChangeEvent<HTMLInputElement>) => {
    setSmallValue(Number(event.target.value))
  }
  const onChangeLarge = (event: ChangeEvent<HTMLInputElement>) => {
    setLargeValue(Number(event.target.value))
  }

  return (
    <Container>
      <Container bottom='medium'>
        <Typography variant='heading' size='medium'>
          Stars
        </Typography>

        <Container flex direction='row'>
          <Container padded='small'>
            <Typography variant='heading' size='small'>
              Small (default)
            </Typography>
            <Container top='small' bottom='small'>
              <Rating.Stars
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
              <Rating.Stars
                size='large'
                onChange={onChangeLarge}
                name='large-rating'
                value={largeValue}
              />
            </Container>
          </Container>
        </Container>
      </Container>

      <Container>
        <Typography variant='heading' size='medium'>
          Thumbs
        </Typography>
        <Container flex direction='row'>
          <Container padded='small'>
            <Typography variant='heading' size='small'>
              Small (default)
            </Typography>
            <Container top='small' bottom='small'>
              <Rating.Thumbs
                size='small'
                onChange={setThumbsSmallValue}
                name='small-thumbs-rating'
                value={thumbsSmallValue}
              />
            </Container>
          </Container>

          <Container padded='small'>
            <Typography variant='heading' size='small'>
              Large
            </Typography>
            <Container top='small' bottom='small'>
              <Rating.Thumbs
                size='large'
                onChange={setThumbsLargeValue}
                name='large-thumbs-rating'
                value={thumbsLargeValue}
              />
            </Container>
          </Container>
        </Container>
      </Container>
    </Container>
  )
}

export default Example
