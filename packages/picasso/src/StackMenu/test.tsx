import React from 'react'
import { fireEvent, render } from '@toptal/picasso/test-utils'

import StackMenu from '../StackMenu'

const TestStackMenu = () => {
  const menu = (
    <StackMenu data-testid='menu-a'>
      <StackMenu.Item>Item A1</StackMenu.Item>
    </StackMenu>
  )

  return (
    <StackMenu data-testid='menu'>
      <StackMenu.Item menu={menu} data-testid='item-a'>
        Item A
      </StackMenu.Item>
      <StackMenu.Item>Item B</StackMenu.Item>
    </StackMenu>
  )
}

describe('StackMenu', () => {
  it('renders', () => {
    const { container } = render(<TestStackMenu />)

    expect(container).toMatchSnapshot()
  })

  it('navigates between menu and submenu', () => {
    const { getByTestId, queryByTestId } = render(<TestStackMenu />)

    fireEvent.click(getByTestId('item-a'))
    expect(queryByTestId('menu-back')).toBeInTheDocument()
    expect(queryByTestId('menu-a')).toBeInTheDocument()

    fireEvent.click(getByTestId('menu-back'))
    expect(queryByTestId('back')).not.toBeInTheDocument()
    expect(queryByTestId('menu-a')).not.toBeInTheDocument()
  })
})
