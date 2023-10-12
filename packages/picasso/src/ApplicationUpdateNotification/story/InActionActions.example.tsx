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
            onClose: () => console.log('close click'),
            dismissable: true,
            actions: () => (
              <ApplicationUpdateNotification.Actions>
                <Button
                  key='btn-update-now'
                  variant='secondary'
                  onClick={() => console.log('Update Now')}
                >
                  Update Now
                </Button>
              </ApplicationUpdateNotification.Actions>
            ),
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
