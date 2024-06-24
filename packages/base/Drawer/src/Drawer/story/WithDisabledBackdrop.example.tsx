import { Button, Typography, Container, Drawer } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Example = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button data-testid='trigger' onClick={() => setOpen(!open)}>
        Show drawer
      </Button>
      <Drawer
        open={open}
        disableBackdrop
        onClose={() => setOpen(false)}
        maintainBodyScrollLock={false}
      >
        <Container data-testid='content' padded={SPACING_4}>
          <Typography>
            The backdrop does not block the interaction with page content.
          </Typography>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
