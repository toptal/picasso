import React, { useState } from 'react'
import { RatingThumbs, Container } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState(true)

  return (
    <Container>
      <RatingThumbs
        name='rating-thumbs'
        interactive={false}
        value={value}
        onChange={setValue}
      />
    </Container>
  )
}

export default Example
