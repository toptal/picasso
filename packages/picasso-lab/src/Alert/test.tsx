import React, { ReactNode } from 'react'
import { render, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Alert, { Props } from './Alert'

const renderAlert = (
  children: ReactNode,
  props: OmitInternalProps<Props, 'children'>
) => {
  const { onClose } = props

  return render(<Alert onClose={onClose}>{children}</Alert>)
}

describe('Alert', () => {
  test('default render', () => {
    const { container } = renderAlert('test example string', {})

    expect(container).toMatchSnapshot()
  })

  describe('with `prop.onClose` is passed', () => {
    test('calls `prop.onClose`', () => {
      const onClose = jest.fn()
      const { getByTitle } = renderAlert('test example string', { onClose })

      const closeButton = getByTitle('Close alert')

      fireEvent.click(closeButton)

      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
