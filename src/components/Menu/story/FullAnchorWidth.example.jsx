import React, { useState } from 'react'
import { Menu, Button } from '@toptal/picasso'

const MenuFullWidthExample = () => {
  const [anchor, setAnchor] = useState(null)
  const [menuMinWidth, setMenuMinWidth] = useState()

  const handleClick = e => {
    setAnchor(e.currentTarget)
    setMenuMinWidth(e.currentTarget.clientWidth)
  }

  const handleClose = () => {
    setAnchor(null)
  }

  return (
    <div>
      <Button variant='basic' onClick={handleClick}>
        Open menu and take full width of the anchor
      </Button>
      <Menu minWidth={menuMinWidth} anchor={anchor} onClose={handleClose}>
        <Menu.Item onClick={handleClose}>Javascript</Menu.Item>
        <Menu.Item onClick={handleClose}>ReactJS</Menu.Item>
        <Menu.Item onClick={handleClose}>EmberJS</Menu.Item>
      </Menu>
    </div>
  )
}

export default MenuFullWidthExample
