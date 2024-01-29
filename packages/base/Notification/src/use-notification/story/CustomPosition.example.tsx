import React from 'react'
import { Button, Notification } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'

const Example = () => {
  const { showCustom } = useNotifications()

  const customNotification = (
    <Notification elevated variant='white'>
      Message
    </Notification>
  )

  return (
    <Button
      variant='secondary'
      onClick={() =>
        showCustom(customNotification, {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        })
      }
    >
      Show custom notification
    </Button>
  )
}

export default Example
