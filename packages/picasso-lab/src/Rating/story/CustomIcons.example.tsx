import React, { ChangeEvent, ReactNode, useState } from 'react'
import { Tooltip } from '@toptal/picasso'
import { Rating } from '@toptal/picasso-lab'

const Example = () => {
  const [value, setValue] = useState(1)

  const onChange = (_: ChangeEvent<HTMLInputElement>, newValue: number) => {
    setValue(newValue)
  }

  const renderItem = (itemValue: number, itemIcon: ReactNode) => {
    return <Tooltip content={`The value is ${itemValue}`}>{itemIcon}</Tooltip>
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
