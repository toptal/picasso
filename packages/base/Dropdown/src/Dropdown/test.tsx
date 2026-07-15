import { fireEvent, render, waitFor, act } from '@toptal/picasso-test-utils'
import React from 'react'
import { Container } from '@toptal/picasso-container'
import { Menu, MenuItem } from '@toptal/picasso-menu'
import { SPACING_2, SPACING_8 } from '@toptal/picasso-utils'

import { DropdownCompound as Dropdown } from '../DropdownCompound'

describe('Dropdown', () => {
  it('renders', () => {
    const { container } = render(
      <Dropdown content={<div>Content</div>}>
        Open Dropdown <Dropdown.Arrow />
      </Dropdown>
    )

    expect(container).toMatchSnapshot()
  })

  it('should render menu', () => {
    const { getByText, baseElement } = render(
      <Dropdown
        content={
          <Menu>
            <MenuItem>Item1</MenuItem>
            <MenuItem>Item2</MenuItem>
            <MenuItem>Item3</MenuItem>
          </Menu>
        }
      >
        Open Dropdown <Dropdown.Arrow />
      </Dropdown>
    )

    const trigger = getByText('Open Dropdown')

    fireEvent.click(trigger)

    expect(baseElement).toMatchSnapshot()
  })

  it('should render menu with focus', async () => {
    const { baseElement, getByText } = render(
      <Container>
        <Dropdown
          content={
            <Menu>
              <MenuItem>Item1</MenuItem>
              <MenuItem>Item2</MenuItem>
              <MenuItem>Item3</MenuItem>
            </Menu>
          }
          disableAutoFocus={false}
        >
          Open Dropdown <Dropdown.Arrow />
        </Dropdown>
      </Container>
    )

    const trigger = getByText('Open Dropdown')

    await act(async () => {
      fireEvent.click(trigger)
    })

    await waitFor(() => {
      expect(document.activeElement).toBe(baseElement.querySelector('li'))
    })

    expect(baseElement).toMatchSnapshot()
  })

  it('should trigger `onOpen`, `onClose` callbacks', () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()

    const { getByText } = render(
      <Dropdown
        content={
          <Menu>
            <MenuItem>Item1</MenuItem>
            <MenuItem>Item2</MenuItem>
            <MenuItem>Item3</MenuItem>
          </Menu>
        }
        onOpen={onOpen}
        onClose={onClose}
      >
        Open Dropdown <Dropdown.Arrow />
      </Dropdown>
    )

    const trigger = getByText('Open Dropdown')

    fireEvent.click(trigger)

    expect(onOpen).toHaveBeenCalledTimes(1)
    expect(onOpen).toHaveBeenCalledWith()

    fireEvent.click(getByText('Item1'))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledWith()
  })

  it('positions the content with a fixed strategy via popperOptions.positionFixed', async () => {
    const { getByText, getByRole } = render(
      <Dropdown
        content={<div>Content</div>}
        popperOptions={{ positionFixed: true }}
      >
        Open Dropdown <Dropdown.Arrow />
      </Dropdown>
    )

    await act(async () => {
      fireEvent.click(getByText('Open Dropdown'))
    })

    expect(getByRole('presentation')).toHaveStyle({ position: 'fixed' })
  })

  describe('offset', () => {
    it('applies a spacing token as a static margin class', async () => {
      const { getByText, getByRole } = render(
        <Dropdown content={<div>Content</div>} offset={{ top: SPACING_8 }}>
          Open Dropdown <Dropdown.Arrow />
        </Dropdown>
      )

      await act(async () => {
        fireEvent.click(getByText('Open Dropdown'))
      })

      expect(getByRole('tooltip')).toHaveClass('mt-8')
    })

    it('applies a responsive offset as mobile-first breakpoint classes', async () => {
      const { getByText, getByRole } = render(
        <Dropdown
          content={<div>Content</div>}
          offset={{ top: { sm: SPACING_2, lg: SPACING_8 } }}
        >
          Open Dropdown <Dropdown.Arrow />
        </Dropdown>
      )

      await act(async () => {
        fireEvent.click(getByText('Open Dropdown'))
      })

      const popper = getByRole('tooltip')

      expect(popper).toHaveClass('sm:mt-2')
      expect(popper).toHaveClass('lg:mt-8')
    })

    it('applies a deprecated numeric offset as an inline rem style, not a class', async () => {
      const { getByText, getByRole } = render(
        <Dropdown content={<div>Content</div>} offset={{ top: 11.75 }}>
          Open Dropdown <Dropdown.Arrow />
        </Dropdown>
      )

      await act(async () => {
        fireEvent.click(getByText('Open Dropdown'))
      })

      const popper = getByRole('tooltip')

      expect(popper).toHaveStyle({ marginTop: '11.75rem' })
      expect(popper.className).not.toMatch(/\bmt-/)
    })

    it('applies a deprecated string offset as its token margin class', async () => {
      const { getByText, getByRole } = render(
        <Dropdown content={<div>Content</div>} offset={{ top: 'small' }}>
          Open Dropdown <Dropdown.Arrow />
        </Dropdown>
      )

      await act(async () => {
        fireEvent.click(getByText('Open Dropdown'))
      })

      expect(getByRole('tooltip')).toHaveClass('mt-4')
    })
  })
})
