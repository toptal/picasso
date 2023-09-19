import React, { useState } from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8 } from '@toptal/picasso/utils'

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
      <Button variant='secondary' onClick={toggleListeners}>
        {listenersEnabled ? 'Disable' : 'Enable'} listeners
      </Button>
      <Container
        top={SPACING_8}
        bottom={SPACING_8}
        left={SPACING_8}
        right={SPACING_8}
        inline
      >
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
