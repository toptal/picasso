import React, { ReactNode } from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import Notification from '../Notification'

const renderNotificationActions = (children: ReactNode) => {
  return render(
    <Notification>
      The time zone in your profile is set to (UTC -08:00) America - Los
      <Notification.Actions>{children}</Notification.Actions>
    </Notification>
  )
}

describe('NotificationActions', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderNotificationActions('Test')
  })

  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
