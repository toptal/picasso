import React from 'react'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const NotificationOptionsExample = () => {
  const { showError } = useNotifications()

  return (
    <Button
      variant='flat'
      onClick={() => {
        showError('Some error text is here', {
          onClose: () => {
            console.log('Error notification closed!')
          },
          autoHideDuration: 1000
        })
      }}
    >
      Show error
    </Button>
  )
}

export default NotificationOptionsExample
