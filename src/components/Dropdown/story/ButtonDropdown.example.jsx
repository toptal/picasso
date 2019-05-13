import React from 'react'
import { Dropdown, Button, Menu } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const ButtonDropdownExample = () => (
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
      <Button variant='primary'>
        Open Dropdown
        <Dropdown.Arrow />
      </Button>
    </Dropdown>
  </div>
)

export default ButtonDropdownExample
