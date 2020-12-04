import React from 'react'
import { Button, Tooltip, Dropdown, Menu } from '@toptal/picasso'

const Example = () => (
  <div>
    <Button.Group>
      <Tooltip content='First...'>
        <Button variant='secondary'>First</Button>
      </Tooltip>
      <Button variant='secondary'>Second</Button>
      <Tooltip content='Third...'>
        <Button variant='secondary'>Third</Button>
      </Tooltip>
      <Dropdown
        content={
          <Menu>
            <Menu.Item>First item</Menu.Item>
            <Menu.Item>Second item</Menu.Item>
            <Menu.Item>Third item</Menu.Item>
          </Menu>
        }
      >
        <Tooltip content='Forth...'>
          <Button variant='secondary'>
            Fourth
            <Dropdown.Arrow />
          </Button>
        </Tooltip>
      </Dropdown>
      <Button variant='secondary'>Fifth</Button>
      <Tooltip content='Sixth...'>
        <span>
          <Button variant='secondary'>Disabled</Button>
        </span>
      </Tooltip>
    </Button.Group>
  </div>
)

export default Example
