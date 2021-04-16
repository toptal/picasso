import React from 'react'
import { fireEvent, render, TestingPicasso } from '@toptal/picasso/test-utils'

import DrilldownMenu from './DrilldownMenu'

const TestDrilldownMenu = () => {
  const menuB1 = (
    <DrilldownMenu data-testid='menu-b1'>
      <DrilldownMenu.Item data-testid='item-b1-1'>Item B1-1</DrilldownMenu.Item>
      <DrilldownMenu.Item data-testid='item-b1-2'>Item B1-2</DrilldownMenu.Item>
    </DrilldownMenu>
  )

  const menuB2 = (
    <DrilldownMenu data-testid='menu-b2'>
      <DrilldownMenu.Item data-testid='item-b2-1'>Item B2-1</DrilldownMenu.Item>
      <DrilldownMenu.Item data-testid='item-b2-2'>Item B2-2</DrilldownMenu.Item>
    </DrilldownMenu>
  )

  const menuB = (
    <DrilldownMenu data-testid='menu-b'>
      <DrilldownMenu.Item menu={menuB1} data-testid='item-b1'>
        Item B1
      </DrilldownMenu.Item>
      <DrilldownMenu.Item menu={menuB2} data-testid='item-b2'>
        Item B2
      </DrilldownMenu.Item>
    </DrilldownMenu>
  )

  return (
    <TestingPicasso>
      <DrilldownMenu data-testid='menu'>
        <DrilldownMenu.Item data-testid='item-a'>Item A</DrilldownMenu.Item>
        <DrilldownMenu.Item menu={menuB} data-testid='item-b'>
          Item B
        </DrilldownMenu.Item>
      </DrilldownMenu>
    </TestingPicasso>
  )
}

describe('DrilldownMenu', () => {
  it('renders', () => {
    const { container } = render(<TestDrilldownMenu />)

    expect(container).toMatchSnapshot()
  })

  it('opens the first level menu on click', () => {
    const { container, getByTestId, queryByTestId } = render(
      <TestDrilldownMenu />
    )

    fireEvent.click(getByTestId('item-b'))

    expect(queryByTestId('menu-b')).toBeInTheDocument()
    expect(queryByTestId('menu-b1')).not.toBeInTheDocument()
    expect(queryByTestId('menu-b2')).not.toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('opens the second level menu on click', () => {
    const { container, getByTestId, queryByTestId } = render(
      <TestDrilldownMenu />
    )

    fireEvent.click(getByTestId('item-b'))
    fireEvent.click(getByTestId('item-b1'))

    expect(queryByTestId('menu-b')).toBeInTheDocument()
    expect(queryByTestId('menu-b1')).toBeInTheDocument()
    expect(queryByTestId('menu-b2')).not.toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('closes menu on click', () => {
    const { container, getByTestId, queryByTestId } = render(
      <TestDrilldownMenu />
    )

    fireEvent.click(getByTestId('item-b'))
    fireEvent.click(document.body)

    expect(queryByTestId('menu')).toBeInTheDocument()
    expect(queryByTestId('menu-b')).not.toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
