import React, { useState } from 'react'
import { NotificationsProvider } from '@toptal/picasso-provider'
import type { NotificationsProviderProps } from '@toptal/picasso-provider'
import { Button, Slider, Typography, Container } from '@toptal/picasso'
import { SPACING_8, useNotifications } from '@toptal/picasso/utils'

const App = () => {
  const { showInfo } = useNotifications()
  const handleClick = () => {
    showInfo('Message')
  }

  return <Button onClick={handleClick}>Open notification</Button>
}

const Example = () => {
  const [maxNotifications, setMaxNotifications] =
    useState<NotificationsProviderProps['maxNotifications']>(1)
  const [notificationContainer, setNotificationContainer] =
    useState<HTMLDivElement | null>(null)

  const handleChange = (
    _: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    setMaxNotifications(
      Number(newValue) as NotificationsProviderProps['maxNotifications']
    )
  }

  return (
    <div style={{ width: 500 }}>
      <Container bottom={SPACING_8}>
        <Container bottom={SPACING_8}>
          <Typography variant='heading' size='small'>
            maxNotifications
          </Typography>
        </Container>

        <Slider
          defaultValue={maxNotifications}
          min={1}
          max={5}
          tooltip='on'
          compact
          marks
          onChange={handleChange}
        />
      </Container>

      {notificationContainer && (
        <NotificationsProvider
          maxNotifications={maxNotifications}
          container={notificationContainer}
        >
          <App />
        </NotificationsProvider>
      )}
      <div data-testid='notifications' ref={setNotificationContainer} />
    </div>
  )
}

export default Example
