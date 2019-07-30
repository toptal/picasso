import React from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const NotificationCustomActionsExample = () => {
  const { showInfo, closeNotification } = useNotifications()

  return (
    <Button
      variant='flat'
      onClick={() => {
        const notificationId = showInfo(
          <Container>
            <Typography>
              Tiny message is here. Want to learn more about it?
            </Typography>
            <Container top='small'>
              <Button onClick={() => closeNotification(notificationId)}>
                Learn more
              </Button>
            </Container>
          </Container>,
          {
            dismissible: false
          }
        )
      }}
    >
      Show information message with custom action
    </Button>
  )
}

export default NotificationCustomActionsExample
