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
      <Drawer open={open} transparentBackdrop onClose={() => setOpen(false)}>
        <Container data-testid='content' padded={SPACING_4}>
          <Typography>
            This is the content. The backdrop doesn't have dark overlay, it is
            transparent.
          </Typography>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
