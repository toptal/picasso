import React, { useState } from 'react'
import { Menu, Button } from '@toptal/picasso'

const MenuDefaultExample = () => {
  const [anchor, setAnchor] = useState(null)

  const handleClick = e => {
    setAnchor(e.currentTarget)
  }

  const handleClose = () => {
    setAnchor(null)
  }

  return (
    <div>
      <Button variant='flat' onClick={handleClick}>
        Open menu
      </Button>
      <Menu anchor={anchor} onClose={handleClose}>
        <Menu.Item onClick={handleClose}>Javascript</Menu.Item>
        <Menu.Item onClick={handleClose}>ReactJS</Menu.Item>
        <Menu.Item onClick={handleClose}>EmberJS</Menu.Item>
      </Menu>
    </div>
  )
}

export default MenuDefaultExample
