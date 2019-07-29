import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const NotificationShowNotificationExample = () => {
  const { showNotification } = useNotifications()

  return (
    <Button
      variant='flat'
      onClick={() =>
        showNotification(
          "That's one small step for a man, one giant leap for mankind."
        )
      }
    >
      Show notification
    </Button>
  )
}

export default NotificationShowNotificationExample
