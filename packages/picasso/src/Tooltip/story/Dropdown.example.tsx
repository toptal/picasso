import { Container, Dropdown, Menu, Tooltip } from '@toptal/picasso'
import React from 'react'

const Example = () => (
  <div>
    <Dropdown
      content={
        <Menu data-testid='menu'>
          <Menu.Item>Option 1</Menu.Item>
          <Tooltip content='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quidem! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quidem!'>
            <Container>
              <Menu.Item disabled>Option 2</Menu.Item>
            </Container>
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
