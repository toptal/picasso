import React from 'react'
import { Dropdown, Menu } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const DropdownDefaultExample = () => (
  <div>
    <Dropdown
      content={
        <Menu>
          <Menu.Item onClick={handleClick}>First item</Menu.Item>
          <Menu.Item onClick={handleClick}>Second item</Menu.Item>
          <Menu.Item onClick={handleClick}>Third item</Menu.Item>
        </Menu>
      }
    >
      Open Dropdown
      <Dropdown.Arrow />
    </Dropdown>
  </div>
)

export default DropdownDefaultExample
