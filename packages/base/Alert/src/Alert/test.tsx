import type { ReactNode } from 'react'
import React from 'react'
import { render, fireEvent } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'
import { noop } from '@toptal/picasso-utils'

import type { Props } from './Alert'
import Alert from './Alert'

const renderAlert = (
  children: ReactNode,
  props: OmitInternalProps<Props, 'children'>
) => {
  const { onClose, actions } = props

  return render(
    <Alert onClose={onClose} actions={actions}>
      {children}
    </Alert>
  )
}

describe('Alert', () => {
  it('renders', () => {
    const actions = {
      primary: {
        onClick: noop,
        label: 'Primary',
      },
      secondary: {
        onClick: noop,
        label: 'Secondary',
      },
    }
    const { container } = renderAlert('test example string', { actions })

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
