import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso-notification'
import { SPACING_4 } from '@toptal/picasso-utils'
import { Pencil16 } from '@toptal/picasso-icons'

const Example = () => {
  const { showInfo } = useNotifications()

  return (
    <Container flex>
      <Container right={SPACING_4}>
        <Button
          variant='secondary'
          onClick={() => showInfo('General information message')}
        >
          Show default general notification
        </Button>
      </Container>
      <Button
        data-testid='trigger'
        variant='secondary'
        onClick={() => showInfo('The record was edited', <Pencil16 />)}
      >
        Show general notification with icon
      </Button>
    </Container>
  )
}

export default Example
