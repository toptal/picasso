import React from 'react'
import { Button, Tooltip, Dropdown, Menu } from '@toptal/picasso'

const Example = () => (
  <div>
    <Button.Group>
      <Tooltip content='First...'>
        <Button.GroupItem first>
          <Button>First</Button>
        </Button.GroupItem>
      </Tooltip>
      <Button>Second</Button>
      <Tooltip content='Third...'>
        <Button.GroupItem>
          <Button>Third</Button>
        </Button.GroupItem>
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
          <Button.GroupItem>
            <Button>
              Fourth
              <Dropdown.Arrow />
            </Button>
          </Button.GroupItem>
        </Tooltip>
      </Dropdown>
      <Button>Fifth</Button>
      <Tooltip content='Sixth...'>
        <Button.GroupItem last>
          <Button>Sixth</Button>
        </Button.GroupItem>
      </Tooltip>
    </Button.Group>
  </div>
)

export default Example
