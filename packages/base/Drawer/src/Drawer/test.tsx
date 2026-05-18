import React from 'react'
import { render, fireEvent, cleanup } from '@toptal/picasso-test-utils'

import Drawer from './Drawer'

describe('Drawer', () => {
  afterEach(cleanup)

  it('renders content when open', () => {
    const { getByTestId } = render(
      <Drawer open onClose={jest.fn()}>
        <span data-testid='drawer-content'>Drawer body</span>
      </Drawer>
    )

    expect(getByTestId('drawer-content')).toBeInTheDocument()
    expect(getByTestId('drawer-content')).toHaveTextContent('Drawer body')
  })

  it('renders the title when provided', () => {
    const { getByText } = render(
      <Drawer open onClose={jest.fn()} title='Operational Issues'>
        <span>body</span>
      </Drawer>
    )

    expect(getByText('Operational Issues')).toBeInTheDocument()
  })

  it('invokes onClose when the close button is clicked', () => {
    const handleClose = jest.fn()

    const { getByLabelText } = render(
      <Drawer open onClose={handleClose}>
        <span>body</span>
      </Drawer>
    )

    fireEvent.click(getByLabelText('Close drawer'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not render a backdrop when disableBackdrop is true', () => {
    const { container } = render(
      <Drawer open onClose={jest.fn()} disableBackdrop>
        <span>body</span>
      </Drawer>
    )

    expect(container.querySelector('.bg-black\\/50')).toBeNull()
  })
})
