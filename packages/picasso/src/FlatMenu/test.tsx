import React from 'react'
import { fireEvent, render } from '@toptal/picasso/test-utils'

import FlatMenu from '../FlatMenu'

const TestFlatMenu = () => {
  const menu = (
    <FlatMenu data-testid='menu-a'>
      <FlatMenu.Item>Item A1</FlatMenu.Item>
    </FlatMenu>
  )

  return (
    <FlatMenu data-testid='menu'>
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

  it('navigates between menu and submenu', () => {
    const { getByTestId, queryByTestId } = render(<TestFlatMenu />)

    fireEvent.click(getByTestId('item-a'))
    expect(queryByTestId('menu-back')).toBeInTheDocument()
    expect(queryByTestId('menu-a')).toBeInTheDocument()

    fireEvent.click(getByTestId('menu-back'))
    expect(queryByTestId('back')).not.toBeInTheDocument()
    expect(queryByTestId('menu-a')).not.toBeInTheDocument()
  })
})
