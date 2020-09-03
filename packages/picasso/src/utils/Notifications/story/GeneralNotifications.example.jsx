import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { Pencil16 } from '@toptal/picasso/Icon'
import { useNotifications } from '@toptal/picasso/utils'

const Example = () => {
  const { showInfo } = useNotifications()

  return (
    <Container flex>
      <Container right={1}>
        <Button
          variant='secondary-blue'
          onClick={() => showInfo('General information message')}
        >
          Show default general notification
        </Button>
      </Container>
      <Button
        variant='secondary-blue'
        onClick={() => showInfo('The record was edited', <Pencil16 />)}
      >
        Show general notification with icon
      </Button>
    </Container>
  )
}

export default Example
