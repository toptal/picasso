import React from 'react'
import { fireEvent, render } from '@toptal/picasso/test-utils'

import FlatMenuItem from '../FlatMenuItem'
import FlatMenuContext from '../FlatMenu/FlatMenuContext'

describe('FlatMenuItem', () => {
  it('renders', () => {
    const { container } = render(<FlatMenuItem>Item</FlatMenuItem>)

    expect(container).toMatchSnapshot()
  })

  it('delegates menu element', () => {
    const menu = <div />
    const refresh = jest.fn()

    render(
      <FlatMenuContext.Provider value={{ refresh }}>
        <FlatMenuItem menu={menu}>Item</FlatMenuItem>
      </FlatMenuContext.Provider>
    )

    expect(refresh).toHaveBeenCalledWith(expect.any(String), menu)
  })

  it('delegates clicks for toggling a menu', () => {
    const menu = <div />
    const push = jest.fn()

    const { getByTestId } = render(
      <FlatMenuContext.Provider value={{ push }}>
        <FlatMenuItem menu={menu} data-testid='item'>
          Item
        </FlatMenuItem>
      </FlatMenuContext.Provider>
    )

    fireEvent.click(getByTestId('item'))

    expect(push).toHaveBeenCalledWith(expect.any(String), menu)
  })
})
