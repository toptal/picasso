import React from 'react'
import { Menu, Dropdown } from '@toptal/picasso'

const DrilldownExample = () => {
  const handleClick = () => {
    console.log('Menu item is clicked')
  }

  const cMenu = (
    <Menu>
      <Menu.Item onClick={handleClick}>Item C1</Menu.Item>
      <Menu.Item onClick={handleClick}>Item C2</Menu.Item>
    </Menu>
  )

  const d3Menu = (
    <Menu>
      <Menu.Item onClick={handleClick}>Item D3-1</Menu.Item>
      <Menu.Item onClick={handleClick}>Item D3-2</Menu.Item>
      <Menu.Item onClick={handleClick}>Item D3-3</Menu.Item>
    </Menu>
  )

  const dMenu = (
    <Menu>
      <Menu.Item onClick={handleClick}>Item D1</Menu.Item>
      <Menu.Item onClick={handleClick}>Item D2</Menu.Item>
      <Menu.Item onClick={handleClick} menu={d3Menu}>
        Item D3
      </Menu.Item>
      <Menu.Item onClick={handleClick}>Item D4</Menu.Item>
      <Menu.Item onClick={handleClick}>Item D5</Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Menu>
        <Menu.Item onClick={handleClick}>Item A</Menu.Item>
        <Menu.Item onClick={handleClick}>Item B</Menu.Item>
        <Menu.Item onClick={handleClick} menu={cMenu}>
          Item C
        </Menu.Item>
        <Menu.Item onClick={handleClick} menu={dMenu}>
          Item D
        </Menu.Item>
        <Menu.Item onClick={handleClick}>Item E</Menu.Item>
      </Menu>

      <Dropdown
        content={
          <Menu>
            <Menu.Item onClick={handleClick}>Item A</Menu.Item>
            <Menu.Item onClick={handleClick}>Item B</Menu.Item>
            <Menu.Item onClick={handleClick} menu={cMenu}>
              Item C
            </Menu.Item>
            <Menu.Item onClick={handleClick} menu={dMenu}>
              Item D
            </Menu.Item>
            <Menu.Item onClick={handleClick}>Item E</Menu.Item>
          </Menu>
        }
      >
        Open Dropdown
        <Dropdown.Arrow />
      </Dropdown>
    </div>
  )
}

export default DrilldownExample
