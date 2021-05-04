import React from 'react'
import { Button, ApplicationUpdateNotification } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const Example = () => {
  const { showCustom } = useNotifications()

  return (
    <Button
      data-testid='trigger'
      variant='secondary'
      onClick={() =>
        showCustom(<ApplicationUpdateNotification />, { persist: true })
      }
    >
      Show App Update Notification
    </Button>
  )
}

export default Example
