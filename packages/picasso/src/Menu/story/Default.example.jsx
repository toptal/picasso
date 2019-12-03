import React from 'react'
import { Menu } from '@toptal/picasso'

const DefaultExample = () => {
  const handleClick = () => {
    window.alert('Menu item is clicked')
  }

  return (
    <div>
      <Menu>
        <Menu.Item size='small' onClick={handleClick}>
          First item
        </Menu.Item>
        <Menu.Item onClick={handleClick}>Second item</Menu.Item>
        <Menu.Item onClick={handleClick}>Third item</Menu.Item>
      </Menu>
    </div>
  )
}

export default DefaultExample
