import React, { ChangeEvent, useState } from 'react'
import { Rating } from '@toptal/picasso-lab'

const Example = () => {
  const [value, setValue] = useState(1)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value))
  }

  return (
    <div style={{ height: 26 }}>
      <Rating onChange={onChange} name='rating' value={value} />
    </div>
  )
}

export default Example
