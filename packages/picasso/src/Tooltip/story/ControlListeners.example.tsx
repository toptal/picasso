import React, { useState } from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'

const TooltipControlListenersExample = () => {
  const [listenersEnabled, setListenersEnabled] = useState(true)

  const enableListeners = () => setListenersEnabled(true)
  const disableListeners = () => setListenersEnabled(false)

  const toggleListeners = () => {
    if (listenersEnabled) {
      disableListeners()
    } else {
      enableListeners()
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Button variant='secondary-blue' onClick={toggleListeners}>
        {listenersEnabled ? 'Disable' : 'Enable'} listeners
      </Button>
      <Container top='large' bottom='large' left='large' right='large' inline>
        <Tooltip
          disableListeners={!listenersEnabled}
          content='Some content...'
          placement='top'
        >
          <Button>Hover</Button>
        </Tooltip>
      </Container>
    </div>
  )
}

export default TooltipControlListenersExample
