import React from 'react'
import { Button, Tooltip, Dropdown, Menu } from '@toptal/picasso'

const Example = () => (
  <div>
    <Button.Group>
      <Tooltip content='First...'>
        <Button.Group.Item>First</Button.Group.Item>
      </Tooltip>
      <Button.Group.Item>Second</Button.Group.Item>
      <Tooltip content='Third...'>
        <Button.Group.Item>Third</Button.Group.Item>
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
          <Button.Group.Item>
            Fourth
            <Dropdown.Arrow />
          </Button.Group.Item>
        </Tooltip>
      </Dropdown>
      <Button.Group.Item>Fifth</Button.Group.Item>
      <Tooltip content='Sixth...'>
        <span>
          <Button.Group.Item>Disabled</Button.Group.Item>
        </span>
      </Tooltip>
    </Button.Group>
  </div>
)

export default Example
