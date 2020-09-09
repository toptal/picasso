import React, { useState } from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { ClickAwayListener } from '@toptal/picasso/utils'

const Example = () => {
  const [open, setOpen] = useState(false)

  const handleTooltipOpen = () => setOpen(true)
  const handleTooltipClose = () => setOpen(false)

  return (
    <div style={{ textAlign: 'center' }}>
      <Container top='large' bottom='large' left='large' right='large' inline>
        <Tooltip content='Some content...' placement='top'>
          <Button>Hover</Button>
        </Tooltip>
      </Container>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Container top='large' bottom='large' left='large' right='large' inline>
          <Tooltip open={open} content='Some content...' placement='top'>
            <Button onClick={handleTooltipOpen}>Click</Button>
          </Tooltip>
        </Container>
      </ClickAwayListener>
    </div>
  )
}

export default Example
