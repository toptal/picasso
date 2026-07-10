import React from 'react'
import type { ReactNode } from 'react'
import { render, fireEvent } from '@toptal/picasso-test-utils'

import type { Props } from './Drawer'
import Drawer from './Drawer'

const renderDrawer = (props: Partial<Props> = {}, children: ReactNode = null) =>
  render(
    <Drawer open onClose={jest.fn()} {...props}>
      <span data-testid='drawer-content'>Drawer body</span>
      {children}
    </Drawer>
  )

describe('Drawer', () => {
  it('renders content when open', () => {
    const { getByTestId } = renderDrawer()

    expect(getByTestId('drawer-content')).toHaveTextContent('Drawer body')
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

    expect(baseElement.querySelector('.bg-black\\/50')).toBeNull()
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
