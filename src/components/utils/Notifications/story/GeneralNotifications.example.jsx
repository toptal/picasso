import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Edit as EditIcon } from '@toptal/picasso/Icon'
import { useNotifications } from '@toptal/picasso/utils'

const GeneralNotificationsExample = () => {
  const { showInfo } = useNotifications()

  return (
    <Container flex>
      <Container right={1}>
        <Button
          variant='flat'
          onClick={() => showInfo('General information message')}
        >
          Show default general notification
        </Button>
      </Container>
      <Button
        variant='flat'
        onClick={() => showInfo('The record was edited', <EditIcon />)}
      >
        Show general notification with icon
      </Button>
    </Container>
  )
}

export default GeneralNotificationsExample
