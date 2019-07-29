import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const NotificationOptionsExample = () => {
  const { showError } = useNotifications()

  return (
    <Button
      variant='flat'
      onClick={() => {
        showError('Error message with custom options', {
          onClose: () => {
            console.log('Error notification closed!')
          },
          autoHideDuration: 1000
        })
      }}
    >
      Show error with custom options
    </Button>
  )
}

export default NotificationOptionsExample
