import React from 'react'
import { Rating } from '@toptal/picasso-lab'

const Example = () => {
  const value = 3

  return (
    <div style={{ height: 26 }}>
      <Rating interactive={false} name='rating' value={value} />
    </div>
  )
}

export default Example
