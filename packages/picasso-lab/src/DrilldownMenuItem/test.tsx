import React, { useCallback, useMemo, useState } from 'react'
import { fireEvent, render, TestingPicasso } from '@toptal/picasso/test-utils'

import DrilldownMenuItem from './DrilldownMenuItem'
import DrilldownMenuContext, {
  DrilldownMenuContextProps
} from '../DrilldownMenu/DrilldownMenuContext'

const TestDrilldownMenuItem = () => {
  const [activeItemKey, setActiveItemKey] = useState<string>()

  const clearActiveItemKey = useCallback(() => setActiveItemKey(undefined), [])

  const contextValue = useMemo(
    (): DrilldownMenuContextProps => ({
      activeItemKey,
      onMouseEnter: setActiveItemKey,
      onClickAway: clearActiveItemKey
    }),
    [activeItemKey, clearActiveItemKey]
  )

  return (
    <TestingPicasso>
      <DrilldownMenuContext.Provider value={contextValue}>
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

  it('delegates mouse enter events', () => {
    const { getByTestId, queryByTestId } = render(<TestDrilldownMenuItem />)

    fireEvent.mouseEnter(getByTestId('item'))

    expect(queryByTestId('menu')).toBeInTheDocument()
  })

  it('delegates click away events', () => {
    const { getByTestId, queryByTestId } = render(<TestDrilldownMenuItem />)

    fireEvent.mouseEnter(getByTestId('item'))
    fireEvent.click(document.body)

    expect(queryByTestId('menu')).not.toBeInTheDocument()
  })
})
