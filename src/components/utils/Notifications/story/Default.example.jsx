import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const NotificationDefaultExample = () => {
  const { showError, showInfo, showWarning, showSuccess } = useNotifications()

  return (
    <Container flex>
      <Container right={1}>
        <Button
          variant='flat'
          onClick={() => showError('Some error text is here')}
        >
          Show error
        </Button>
      </Container>
      <Container right={1}>
        <Button
          variant='flat'
          onClick={() =>
            showInfo(
              "That's one small step for a man, one giant leap for mankind."
            )
          }
        >
          Show info
        </Button>
      </Container>
      <Container right={1}>
        <Button variant='flat' onClick={() => showSuccess('Success message')}>
          Show success
        </Button>
      </Container>
      <Button
        variant='flat'
        onClick={() => showWarning('Some warning message is here')}
      >
        Show warning
      </Button>
    </Container>
  )
}

export default NotificationDefaultExample
