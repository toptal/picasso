import React from 'react'
import { Button, Tooltip, Dropdown, Menu } from '@toptal/picasso'

const Example = () => (
  <div>
    <Button.Group>
      <Tooltip content='First...'>
        <span>
          <Button.Group.Item>First</Button.Group.Item>
        </span>
      </Tooltip>
      <Button.Group.Item>Second</Button.Group.Item>
      <Tooltip content='Third...'>
        <span>
          <Button.Group.Item>Third</Button.Group.Item>
        </span>
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
          <span>
            <Button.Group.Item>
              Fourth
              <Dropdown.Arrow />
            </Button.Group.Item>
          </span>
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
