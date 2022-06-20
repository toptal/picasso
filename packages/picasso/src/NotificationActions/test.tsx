import React, { ReactNode } from 'react'
import { render, RenderResult } from '@toptal/picasso/test-utils'

import { NotificationCompound as Notification } from '../NotificationCompound'

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

  it('renders', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
