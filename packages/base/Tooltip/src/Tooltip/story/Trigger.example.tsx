import React, { useState } from 'react'
import { Tooltip, Button, Container } from '@toptal/picasso'
import { SPACING_8, ClickAwayListener } from '@toptal/picasso-utils'

const Example = () => {
  const [open, setOpen] = useState(false)

  const toogleTooltipOpen = () => setOpen(!open)
  const closeTooltip = () => setOpen(false)

  return (
    <div style={{ textAlign: 'center' }}>
      <Container
        top={SPACING_8}
        bottom={SPACING_8}
        left={SPACING_8}
        right={SPACING_8}
        inline
      >
        <Tooltip content='Some content...' placement='top'>
          <Button>Hover</Button>
        </Tooltip>
      </Container>
      <ClickAwayListener onClickAway={closeTooltip}>
        <Container
          top={SPACING_8}
          bottom={SPACING_8}
          left={SPACING_8}
          right={SPACING_8}
          inline
        >
          <Tooltip open={open} content='Some content...' placement='top'>
            <Button onClick={toogleTooltipOpen}>Click</Button>
          </Tooltip>
        </Container>
      </ClickAwayListener>
    </div>
  )
}

export default Example
