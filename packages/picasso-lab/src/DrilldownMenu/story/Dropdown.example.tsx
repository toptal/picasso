import { Dropdown } from '@toptal/picasso'
import { DrilldownMenu } from '@toptal/picasso-lab'
import React from 'react'

const Example = () => {
  const menuForItemC = (
    <DrilldownMenu>
      <DrilldownMenu.Item>Item C1</DrilldownMenu.Item>
      <DrilldownMenu.Item>Item C2</DrilldownMenu.Item>
    </DrilldownMenu>
  )

  const menuForItemD3 = (
    <DrilldownMenu>
      <DrilldownMenu.Item>Item D3-1</DrilldownMenu.Item>
      <DrilldownMenu.Item>Item D3-2</DrilldownMenu.Item>
    </DrilldownMenu>
  )

  const menuForItemD = (
    <DrilldownMenu>
      <DrilldownMenu.Item>Item D1</DrilldownMenu.Item>
      <DrilldownMenu.Item>Item D2</DrilldownMenu.Item>
      <DrilldownMenu.Item menu={menuForItemD3}>Item D3</DrilldownMenu.Item>
      <DrilldownMenu.Item>Item D4</DrilldownMenu.Item>
      <DrilldownMenu.Item>Item D5</DrilldownMenu.Item>
    </DrilldownMenu>
  )

  const menuForDropdown = (
    <DrilldownMenu>
      <DrilldownMenu.Item>Item A</DrilldownMenu.Item>
      <DrilldownMenu.Item>Item B</DrilldownMenu.Item>
      <DrilldownMenu.Item menu={menuForItemC}>Item C</DrilldownMenu.Item>
      <DrilldownMenu.Item menu={menuForItemD}>Item D</DrilldownMenu.Item>
      <DrilldownMenu.Item>Item E</DrilldownMenu.Item>
    </DrilldownMenu>
  )

  return (
    <Dropdown content={menuForDropdown}>
      Open
      <Dropdown.Arrow />
    </Dropdown>
  )
}

export default Example
