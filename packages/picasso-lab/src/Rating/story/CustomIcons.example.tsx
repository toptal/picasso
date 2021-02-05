import React, { ChangeEvent, ReactNode, useState } from 'react'
import { Tooltip } from '@toptal/picasso'
import { Rating } from '@toptal/picasso-lab'

const Example = () => {
  const [value, setValue] = useState(1)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value))
  }

  const renderItem = (itemValue: number, defaultIcon: ReactNode) => {
    return (
      <Tooltip content={`The value is ${itemValue}`}>{defaultIcon}</Tooltip>
    )
  }

  return (
    <div style={{ height: 26 }}>
      <Rating
        onChange={onChange}
        name='render-item-rating'
        value={value}
        renderItem={renderItem}
      />
    </div>
  )
}

export default Example
