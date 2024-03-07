import { Container, Button } from '@toptal/picasso'
import { Backdrop } from '@toptal/picasso-backdrop'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Example = () => {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <Container bottom={SPACING_4}>
      <Button onClick={() => setOpen(true)}>Open Backdrop</Button>
      {open && (
        <div className='fixed top-0 left-0 w-full h-full z-modal flex items-center justify-center'>
          <Backdrop invisible open={open} onClick={close} />
          <div className='h-full flex items-center justify-center'>
            <Button onClick={close}>Close</Button>
          </div>
        </div>
      )}
    </Container>
  )
}

export default Example
