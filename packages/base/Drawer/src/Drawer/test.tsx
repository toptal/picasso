import React, { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { render, fireEvent, screen } from '@toptal/picasso-test-utils'

import type { Props } from './Drawer'
import Drawer from './Drawer'

const renderDrawer = (props: Partial<Props> = {}, children: ReactNode = null) =>
  render(
    <Drawer open onClose={jest.fn()} {...props}>
      <span data-testid='drawer-content'>Drawer body</span>
      {children}
    </Drawer>
  )

const getBackdrops = (element: HTMLElement) =>
  element.querySelectorAll('.bg-black\\/50')

describe('Drawer', () => {
  it('renders content when open', () => {
    const { getByTestId } = renderDrawer()

    expect(getByTestId('drawer-content')).toHaveTextContent('Drawer body')
  })

  it('renders content when opened after mount', async () => {
    const TestComponent = () => {
      const [open, setOpen] = useState(false)

      useEffect(() => {
        setOpen(true)
      }, [])

      return (
        <Drawer open={open} onClose={jest.fn()}>
          <span data-testid='drawer-content'>Drawer body</span>
        </Drawer>
      )
    }

    render(<TestComponent />)

    expect(await screen.findByTestId('drawer-content')).toHaveTextContent(
      'Drawer body'
    )
  })

  it('renders the title when provided', () => {
    const { getByText } = renderDrawer({ title: 'Operational Issues' })

    expect(getByText('Operational Issues')).toBeInTheDocument()
  })

  it('invokes onClose when the close button is clicked', () => {
    const onClose = jest.fn()

    const { getByLabelText } = renderDrawer({ onClose })

    fireEvent.click(getByLabelText('Close drawer'))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not render a backdrop when disableBackdrop is set', () => {
    const { baseElement } = renderDrawer({ disableBackdrop: true })

    expect(getBackdrops(baseElement)).toHaveLength(0)
  })

  it('renders a backdrop for a nested drawer by default', () => {
    const { baseElement } = renderDrawer(
      {},
      <Drawer open onClose={jest.fn()}>
        <span>Nested drawer body</span>
      </Drawer>
    )

    expect(getBackdrops(baseElement)).toHaveLength(2)
  })

  it('given forceRender is false, does not render a backdrop for a nested drawer', () => {
    const { baseElement } = renderDrawer(
      {},
      <Drawer open forceRender={false} onClose={jest.fn()}>
        <span>Nested drawer body</span>
      </Drawer>
    )

    expect(getBackdrops(baseElement)).toHaveLength(1)
  })

  it('disables paper scrolling when disableScroll is set', () => {
    const { getByTestId } = renderDrawer({
      disableScroll: true,
      'data-testid': 'drawer',
    })

    const paper = getByTestId('drawer')

    expect(paper).toHaveClass('overflow-hidden')
    expect(paper).not.toHaveClass('overflow-y-auto')
  })

  it('keeps paper scrolling by default', () => {
    const { getByTestId } = renderDrawer({ 'data-testid': 'drawer' })

    expect(getByTestId('drawer')).toHaveClass('overflow-y-auto')
  })
})
