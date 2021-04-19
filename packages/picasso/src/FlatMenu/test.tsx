import React from 'react'
import { fireEvent, render } from '@toptal/picasso/test-utils'

import FlatMenu from '../FlatMenu'

const TestFlatMenu = () => {
  const menu = (
    <FlatMenu>
      <FlatMenu.Item>Item A1</FlatMenu.Item>
    </FlatMenu>
  )

  return (
    <FlatMenu>
      <FlatMenu.Item menu={menu} data-testid='item-a'>
        Item A
      </FlatMenu.Item>
      <FlatMenu.Item>Item B</FlatMenu.Item>
    </FlatMenu>
  )
}

describe('FlatMenu', () => {
  it('renders', () => {
    const { container } = render(<TestFlatMenu />)

    expect(container).toMatchSnapshot()
  })

  it('has back button when in submenu', () => {
    const { container, getByTestId } = render(<TestFlatMenu />)

    fireEvent.click(getByTestId('item-a'))

    expect(container).toMatchSnapshot()
  })
})
