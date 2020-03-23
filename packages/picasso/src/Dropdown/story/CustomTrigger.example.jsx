import React from 'react'
import { Dropdown, Menu, UserBadge } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const Example = () => (
  <div>
    <Dropdown
      content={
        <Menu style={{ width: '15rem' }}>
          <Menu.Item onClick={handleClick}>First item</Menu.Item>
          <Menu.Item onClick={handleClick}>Second item</Menu.Item>
          <Menu.Item onClick={handleClick}>Third item</Menu.Item>
        </Menu>
      }
      offset={{ top: 'xsmall' }}
    >
      <UserBadge
        name='Jacqueline Roque'
        avatar='./jacqueline-with-flowers-1954-square.jpg'
      />
      <Dropdown.Arrow />
    </Dropdown>
  </div>
)

export default Example
