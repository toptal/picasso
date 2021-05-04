import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import Menu from './Menu'

describe('Menu', () => {
  it('renders', () => {
    const { container } = render(
      <Menu>
        <Menu.Item>1</Menu.Item>
        <Menu.Item>2</Menu.Item>
      </Menu>
    )

    expect(container).toMatchSnapshot()
  })
})
