import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import FlatMenu from '../FlatMenu'

const TestFlatMenu = () => {
  return (
    <FlatMenu>
      <FlatMenu.Item>Item A</FlatMenu.Item>
      <FlatMenu.Item>Item B</FlatMenu.Item>
    </FlatMenu>
  )
}

describe('FlatMenu', () => {
  it('renders', () => {
    const { container } = render(<TestFlatMenu />)

    expect(container).toMatchSnapshot()
  })
})
