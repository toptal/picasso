import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso-test-utils'

import { MenuCompound as Menu } from '../MenuCompound'

const pressKey = (element: Element, key: string) =>
  fireEvent.keyDown(element, { key })

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

  describe('keyboard navigation', () => {
    const renderFlatMenu = () =>
      render(
        <Menu autoFocus>
          <Menu.Item>First</Menu.Item>
          <Menu.Item disabled>Disabled</Menu.Item>
          <Menu.Item>Second</Menu.Item>
          <Menu.Item>Last</Menu.Item>
        </Menu>
      )

    it('focuses the selected item on mount with autoFocus', () => {
      render(
        <Menu autoFocus>
          <Menu.Item>First</Menu.Item>
          <Menu.Item selected>Selected</Menu.Item>
        </Menu>
      )

      expect(screen.getByText('Selected').closest('li')).toHaveFocus()
    })

    it('does not move focus on mount without autoFocus', () => {
      render(
        <Menu>
          <Menu.Item>First</Menu.Item>
        </Menu>
      )

      expect(document.body).toHaveFocus()
    })

    it.each([
      ['ArrowDown', 'First', 'Second'],
      ['ArrowDown', 'Last', 'First'],
      ['ArrowUp', 'Second', 'First'],
      ['ArrowUp', 'First', 'Last'],
      ['Home', 'Last', 'First'],
      ['End', 'First', 'Last'],
    ])(
      '%s moves focus from %s to %s, skipping disabled items',
      (key, from, to) => {
        renderFlatMenu()
        const fromItem = screen.getByText(from).closest('li') as HTMLElement

        fromItem.focus()
        pressKey(fromItem, key)

        expect(screen.getByText(to).closest('li')).toHaveFocus()
      }
    )

    it.each(['Enter', ' '])('activates the focused item with %p', key => {
      const handleClick = jest.fn()

      render(
        <Menu autoFocus>
          <Menu.Item onClick={handleClick}>First</Menu.Item>
        </Menu>
      )

      pressKey(screen.getByText('First').closest('li') as HTMLElement, key)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('ignores keys pressed inside an item content', () => {
      render(
        <Menu autoFocus>
          <Menu.Item>
            <input aria-label='Search' />
          </Menu.Item>
          <Menu.Item>Second</Menu.Item>
        </Menu>
      )
      const input = screen.getByLabelText('Search')

      input.focus()
      pressKey(input, 'ArrowDown')

      expect(input).toHaveFocus()
    })

    it('opens a drilldown submenu with ArrowRight and closes it with ArrowLeft', () => {
      render(
        <Menu variant='drilldown' autoFocus>
          <Menu.Item
            menu={
              <Menu variant='drilldown'>
                <Menu.Item>Inner</Menu.Item>
              </Menu>
            }
          >
            Parent
          </Menu.Item>
        </Menu>
      )
      const parentItem = screen.getByText('Parent').closest('li') as HTMLElement

      pressKey(parentItem, 'ArrowRight')

      const innerItem = screen.getByText('Inner').closest('li') as HTMLElement

      expect(innerItem).toHaveFocus()

      pressKey(innerItem, 'ArrowLeft')

      expect(screen.queryByText('Inner')).not.toBeInTheDocument()
      expect(parentItem).toHaveFocus()
    })

    it('opens a slide submenu with Enter and returns with ArrowLeft', () => {
      render(
        <Menu autoFocus>
          <Menu.Item
            menu={
              <Menu>
                <Menu.Item>Inner</Menu.Item>
              </Menu>
            }
          >
            Parent
          </Menu.Item>
        </Menu>
      )

      pressKey(screen.getByText('Parent').closest('li') as HTMLElement, 'Enter')

      const innerItem = screen.getByText('Inner').closest('li') as HTMLElement

      expect(innerItem).toHaveFocus()

      pressKey(innerItem, 'ArrowLeft')

      expect(screen.queryByText('Inner')).not.toBeInTheDocument()
      expect(screen.getByText('Parent').closest('li')).toHaveFocus()
    })
  })
})
