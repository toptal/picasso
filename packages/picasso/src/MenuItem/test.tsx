import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import MenuItem, { MenuItemProps } from '../MenuItem'

const TestMenuItem = (props: MenuItemProps) => {
  return <MenuItem {...props} />
}

describe('MenuItem', () => {
  it('renders', () => {
    const { container } = render(<TestMenuItem>Item</TestMenuItem>)

    expect(container).toMatchSnapshot()
  })
})
