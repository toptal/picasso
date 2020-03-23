import React, { forwardRef } from 'react'
import { Menu } from '@toptal/picasso'

// Replace with `import { Link } from 'react-router-dom'`
const Link = forwardRef(({ to, children, ...rest }, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <a href={to} ref={ref} {...rest}>
    {children}
  </a>
))

const Example = () => (
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

export default Example
