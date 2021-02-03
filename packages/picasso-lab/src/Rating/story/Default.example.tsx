import React, { ChangeEvent, useState } from 'react'
import { Rating } from '@toptal/picasso-lab'

const Example = () => {
  const [value, setValue] = useState(1)

  const onChange = (_: ChangeEvent<HTMLInputElement>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <div style={{ height: 26 }}>
      <Rating onChange={onChange} name='rating' value={value} />
    </div>
  )
}

export default Example
