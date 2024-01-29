import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import { useNotifications } from '@toptal/picasso-notification'

const Example = () => {
  const { showError, showInfo, showSuccess } = useNotifications()

  return (
    <Container flex>
      <Container right={SPACING_4}>
        <Button
          data-testid='error-trigger'
          variant='secondary'
          onClick={() => showError('Some error text is here')}
        >
          Show error notification
        </Button>
      </Container>
      <Container right={SPACING_4}>
        <Button
          data-testid='success-trigger'
          variant='secondary'
          onClick={() => showSuccess('Success message')}
        >
          Show success notification
        </Button>
      </Container>
      <Button
        variant='secondary'
        onClick={() =>
          showInfo(
            "That's one small step for a man, one giant leap for mankind."
          )
        }
      >
        Show general notification
      </Button>
    </Container>
  )
}

export default Example
