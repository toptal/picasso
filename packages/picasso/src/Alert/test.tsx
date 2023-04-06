import type { ReactNode } from 'react'
import React from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import type { Props } from './Alert'
import Alert from './Alert'

const renderAlert = (
  children: ReactNode,
  props: OmitInternalProps<Props, 'children'>
) => {
  const { onClose } = props

  return render(<Alert onClose={onClose}>{children}</Alert>)
}

describe('Alert', () => {
  it('renders', () => {
    const { container } = renderAlert('test example string', {})

    expect(container).toMatchSnapshot()
  })

  describe('with `prop.onClose` is passed', () => {
    it('calls `prop.onClose`', () => {
      const onClose = jest.fn()
      const { getByTitle } = renderAlert('test example string', { onClose })

      const closeButton = getByTitle('Close alert')

      fireEvent.click(closeButton)

      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
