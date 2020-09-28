import React, { ReactNode } from 'react'
import { render, RenderResult, fireEvent } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import Notification, { PublicProps } from './Notification'

const renderNotification = (
  children: ReactNode,
  props: OmitInternalProps<PublicProps, 'children'>
) => {
  const { onClose } = props

  return render(<Notification onClose={onClose}>{children}</Notification>)
}

describe('Notification', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderNotification('test example string', {})
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  describe('with `prop.onClose` is passed', () => {
    let onClose: () => void

    beforeEach(() => {
      onClose = jest.fn()
      api = renderNotification('test example string', { onClose })

      const { getByTitle } = api
      const closeButton = getByTitle('Close Notification')

      fireEvent.click(closeButton)
    })

    test('calls `prop.onClose`', () => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
