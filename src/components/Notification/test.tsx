import React, { ReactNode } from 'react'
import { render, cleanup, RenderResult, fireEvent } from 'react-testing-library'

import Picasso, { UserDefinedProps } from '../Picasso'
import Notification, { Props } from './Notification'

const renderNotification = (
  children: ReactNode,
  props: UserDefinedProps<Props, 'children'>
) => {
  const { onClose } = props

  return render(
    <Picasso loadFonts={false}>
      <Notification onClose={onClose}>{children}</Notification>
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
