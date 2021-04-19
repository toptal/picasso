import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Menu, { MenuProps } from '../Menu'

const TestMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <Menu.Item>Item A</Menu.Item>
      <Menu.Item>Item B</Menu.Item>
    </Menu>
  )
}

describe('Menu', () => {
  it('renders', () => {
    const { container } = render(<TestMenu />)

    expect(container).toMatchSnapshot()
  })
})
