import React, { createElement } from 'react'
import { Button, ApplicationUpdateNotification } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const Example = () => {
  const { showCustom } = useNotifications()

  return (
    <Button
      data-testid='trigger'
      variant='secondary'
      onClick={() =>
        showCustom(
          createElement(ApplicationUpdateNotification, {
            onReloadClick: () => console.log('reload click'),
            onClose: () => console.log('close click')
          }),
          { persist: true }
        )
      }
    >
      Show App Update Notification
    </Button>
  )
}

export default Example
