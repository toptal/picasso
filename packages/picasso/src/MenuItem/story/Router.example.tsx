import React, { forwardRef } from 'react'
import { Menu } from '@toptal/picasso'

const Example = () => (
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
)

export default Example

// For demo purposes only - replace with `import { Link } from 'react-router-dom'`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Link = forwardRef(({ to, children, ...rest }: any, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <a href={to} ref={ref} {...rest}>
    {children}
  </a>
))
