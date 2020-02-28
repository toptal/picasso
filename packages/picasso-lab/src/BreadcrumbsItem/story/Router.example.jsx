import React from 'react'
import { Menu } from '@toptal/picasso'

// Replace with `import { Link } from 'react-router-dom'`
const Link = ({ to, children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <a href={to} {...rest}>
    {children}
  </a>
)

const MenuItemRouterExample = () => (
  <div>
    <Menu>
      <Menu.Item as={Link} to='/#home'>
        Home
      </Menu.Item>
      <Menu.Item as={Link} to='/#about'>
        About
      </Menu.Item>
      <Menu.Item as={Link} to='/#contact'>
        Contact
      </Menu.Item>
    </Menu>
  </div>
)

export default MenuItemRouterExample
