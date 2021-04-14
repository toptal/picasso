import React, { useState } from 'react'
import { fireEvent, render, TestingPicasso } from '@toptal/picasso/test-utils'

import DrilldownMenuItem from './'
import DrilldownMenuContext from '../DrilldownMenu/DrilldownMenuContext'

const TestDrilldownMenuItem = () => {
  const [activeMenuKey, setActiveMenuKey] = useState<string | undefined>(
    undefined
  )

  return (
    <TestingPicasso>
      <DrilldownMenuContext.Provider
        value={{ activeMenuKey, setActiveMenuKey }}
      >
        <DrilldownMenuItem menu={<div data-testid='menu' />} data-testid='item'>
          Item
        </DrilldownMenuItem>
      </DrilldownMenuContext.Provider>
    </TestingPicasso>
  )
}

describe('DrilldownMenuItem', () => {
  it('renders', () => {
    const { container } = render(<TestDrilldownMenuItem />)

    expect(container).toMatchSnapshot()
  })

  it('sets active menu key when clicked', () => {
    const { getByTestId, queryByTestId } = render(<TestDrilldownMenuItem />)

    fireEvent.click(getByTestId('item'))

    expect(queryByTestId('menu')).toBeInTheDocument()
  })

  it('clears active menu key when clicked outside of the inner menu', () => {
    const { getByTestId, queryByTestId } = render(<TestDrilldownMenuItem />)

    fireEvent.click(getByTestId('item'))
    fireEvent.click(document.body)

    expect(queryByTestId('menu')).not.toBeInTheDocument()
  })
})
