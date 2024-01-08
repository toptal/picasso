import React from 'react'
import { Dropdown, Menu } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const Example = () => (
  <div>
    <Dropdown
      content={
        <Menu data-testid='menu'>
          <Menu.Item onClick={handleClick}>First item</Menu.Item>
          <Menu.Item onClick={handleClick}>Second item</Menu.Item>
          <Menu.Item onClick={handleClick}>Third item</Menu.Item>
        </Menu>
      }
    >
      Open Dropdown
      <Dropdown.Arrow data-testid='trigger' />
    </Dropdown>
  </div>
)

export default Example
