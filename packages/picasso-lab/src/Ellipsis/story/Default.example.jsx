import React from 'react'
import { Typography, Tooltip, Input } from '@toptal/picasso'
import { Ellipsis } from '@toptal/picasso-lab'

const Example = () => {
  const [text, setText] = React.useState('Type for tooltip')

  const handleChange = event => {
    setText(event.target.value)
  }

  return (
    <div style={{ width: 200 }}>
      <Ellipsis
        renderWhenEllipsis={child => (
          <Tooltip content={text} open placement='top'>
            {child}
          </Tooltip>
        )}
      >
        <Typography noWrap>{text}</Typography>
      </Ellipsis>
      <Input
        value={text}
        placeholder='Placeholder'
        onChange={handleChange}
        data-testid='input'
      />
    </div>
  )
}

export default Example
