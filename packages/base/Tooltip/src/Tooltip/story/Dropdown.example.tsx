import { Dropdown, Menu, Tooltip } from '@toptal/picasso'
import React from 'react'

const Example = () => (
  <div>
    <Dropdown
      content={
        <Menu>
          <Menu.Item>Option 1</Menu.Item>
          <Tooltip
            open
            content='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quidem! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quidem!'
          >
            <Menu.Item>Option 2</Menu.Item>
          </Tooltip>
          <Menu.Item>Option 3</Menu.Item>
        </Menu>
      }
    >
      Open Dropdown
      <Dropdown.Arrow data-testid='trigger' />
    </Dropdown>
  </div>
)

export default Example
