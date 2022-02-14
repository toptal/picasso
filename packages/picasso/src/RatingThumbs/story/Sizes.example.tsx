import {
  Container,
  RatingThumbs,
  RatingThumbsProps,
  Typography
} from '@toptal/picasso'
import React, { useState } from 'react'

const ThumbsInput = ({
  size,
  initialValue,
  name
}: {
  name: string
  initialValue?: boolean
  size: RatingThumbsProps['size']
}) => {
  const [value, setValue] = useState<boolean>(!!initialValue)

  return (
    <RatingThumbs name={name} size={size} value={value} onChange={setValue} />
  )
}

const Example = () => (
  <Container flex direction='column'>
    <Container padded='small'>
      <Typography variant='heading' size='small'>
        Small (Default)
      </Typography>

      <Container top='small' bottom='small'>
        <ThumbsInput name='input1' size='small' initialValue />
      </Container>
    </Container>

    <Container padded='small'>
      <Typography variant='heading' size='small'>
        Large
      </Typography>

      <Container top='small' bottom='small'>
        <ThumbsInput name='input1' size='large' />
      </Container>
    </Container>
  </Container>
)

export default Example
