import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'

import Notification from './Notification'

describe('Notification', () => {
  it('renders', () => {
    const { container } = render(
      <Notification>test example string</Notification>
    )

    expect(container).toMatchSnapshot()
  })

  it.each(['green', 'red', 'white', 'yellow'] as const)(
    'has role "alert"',
    variant => {
      const api = render(<Notification variant={variant}>Error</Notification>)

      expect(api.getByRole('alert')).toBeDefined()
    }
  )

  it('calls onClose', () => {
    const onClose = jest.fn()
    const { container } = render(
      <Notification onClose={onClose}>test example string</Notification>
    )
    const closeButton = container.querySelector('button')

    if (closeButton) {
      fireEvent.click(closeButton)
    }

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
