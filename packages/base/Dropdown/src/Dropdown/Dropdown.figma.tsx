import figma from '@figma/code-connect'
import React from 'react'
import { Dropdown, Menu } from '@toptal/picasso'

figma.connect(
  Dropdown,
  'https://www.figma.com/design/0zTTN9YKOABPGLQ4NsyEW5/Product-Library-v2.0?node-id=17921-38502',
  {
    example: () => (
      <Dropdown
        content={
          <Menu>
            <Menu.Item onClick={() => {}}>Item 1</Menu.Item>
            <Menu.Item onClick={() => {}}>Item 2</Menu.Item>
            <Menu.Item onClick={() => {}}>Item 3</Menu.Item>
          </Menu>
        }
      >
        Open Dropdown
        <Dropdown.Arrow />
      </Dropdown>
    ),
  }
)
