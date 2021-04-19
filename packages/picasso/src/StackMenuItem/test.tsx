import React from 'react'
import { fireEvent, render } from '@toptal/picasso/test-utils'

import StackMenuItem from '../StackMenuItem'
import StackMenuContext from '../StackMenu/StackMenuContext'

describe('StackMenuItem', () => {
  it('renders', () => {
    const { container } = render(<StackMenuItem>Item</StackMenuItem>)

    expect(container).toMatchSnapshot()
  })

  it('delegates menu element', () => {
    const menu = <div />
    const refresh = jest.fn()

    render(
      <StackMenuContext.Provider value={{ refresh }}>
        <StackMenuItem menu={menu}>Item</StackMenuItem>
      </StackMenuContext.Provider>
    )

    expect(refresh).toHaveBeenCalledWith(expect.any(String), menu)
  })

  it('delegates clicks for toggling a menu', () => {
    const menu = <div />
    const push = jest.fn()

    const { getByTestId } = render(
      <StackMenuContext.Provider value={{ push }}>
        <StackMenuItem menu={menu} data-testid='item'>
          Item
        </StackMenuItem>
      </StackMenuContext.Provider>
    )

    fireEvent.click(getByTestId('item'))

    expect(push).toHaveBeenCalledWith(expect.any(String), menu)
  })
})
