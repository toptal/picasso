import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const NotificationPersistentExample = () => {
  const { showError } = useNotifications()

  return (
    <Button
      variant='flat'
      onClick={() => {
        showError('Persistent error message', {
          persist: true
        })
      }}
    >
      Show persistent error
    </Button>
  )
}

export default NotificationPersistentExample
