import React from 'react'
import { Dropdown, Menu } from '@toptal/picasso'

const handleClick = () => window.alert('Item clicked')

const Example = () => (
  <div>
    <Dropdown
      contentStyle={{
        height: '100%',
        maxHeight: '20rem',
      }}
      content={
        <Menu data-testid='menu'>
          <Menu.Item onClick={handleClick}>Item 1</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 2</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 3</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 4</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 5</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 6</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 7</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 8</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 9</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 10</Menu.Item>
          <Menu.Item onClick={handleClick}>Item 11</Menu.Item>
        </Menu>
      }
    >
      Open Dropdown
      <Dropdown.Arrow data-testid='trigger' />
    </Dropdown>
  </div>
)

export default Example
