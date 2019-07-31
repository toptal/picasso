import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'

const VariantsExample = () => {
  const { showError, showInfo, showSuccess } = useNotifications()

  return (
    <Container flex>
      <Container right={1}>
        <Button
          variant='flat'
          onClick={() => showError('Some error text is here')}
        >
          Show error notification
        </Button>
      </Container>
      <Container right={1}>
        <Button variant='flat' onClick={() => showSuccess('Success message')}>
          Show success notification
        </Button>
      </Container>
      <Button
        variant='flat'
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

export default VariantsExample
