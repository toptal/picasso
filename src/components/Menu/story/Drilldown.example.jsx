import React from 'react'
import { Menu } from '@toptal/picasso'

const DrilldownExample = () => {
  const handleClick = () => {
    console.log('Menu item is clicked')
  }

  const submenu = (
    <Menu>
      <Menu.Item onClick={handleClick}>Submenu First item</Menu.Item>
      <Menu.Item onClick={handleClick}>Submenu Second item</Menu.Item>
      <Menu.Item onClick={handleClick}>Submenu Third item</Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Menu>
        <Menu.Item onClick={handleClick}>First item</Menu.Item>
        <Menu.Item onClick={handleClick} menu={submenu}>
          Second item
        </Menu.Item>
        <Menu.Item onClick={handleClick}>Third item</Menu.Item>
      </Menu>
    </div>
  )
}

export default DrilldownExample
