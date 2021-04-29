import React from 'react'
import { Button, Notification, Link } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const Example = () => {
  const { showCustom } = useNotifications()

  const customNotification = (
    <Notification variant='white'>
      Art as the single superior counterforce against all will to negation of
      life. <br />
      Friedrich Nietzsche
      <Notification.Actions>
        <Link href='#'>Do art</Link>
      </Notification.Actions>
    </Notification>
  )

  return (
    <Button
      data-testid='trigger'
      variant='secondary'
      onClick={() => showCustom(customNotification, { persist: true })}
    >
      Show custom notification
    </Button>
  )
}

export default Example
