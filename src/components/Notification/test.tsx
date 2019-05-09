import React, { ReactNode } from 'react'
import { render, cleanup, RenderResult, fireEvent } from 'react-testing-library'

import Notification from './index'
import Picasso from '../index'

const renderNotification = (children: ReactNode, props: any) => {
  return render(
    <Picasso loadFonts={false}>
      <Notification {...props}>{children}</Notification>
    </Picasso>
  )
}

afterEach(cleanup)

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
