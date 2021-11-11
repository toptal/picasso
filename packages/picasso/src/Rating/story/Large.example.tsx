import React, { ChangeEvent, useState } from 'react'
import { Rating } from '@toptal/picasso'

const Example = () => {
  const [value, setValue] = useState(1)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value))
  }

  return (
    <Rating
      size='large'
      onChange={onChange}
      name='large-rating'
      value={value}
    />
  )
}

export default Example
