import React, { useState } from 'react'
import { RatingThumbs } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState<boolean>()

  return (
    <>
      {JSON.stringify(value) ?? String(value)}
      <RatingThumbs name='rating-thumbs' value={value} onChange={setValue} />
    </>
  )
}

export default Example
