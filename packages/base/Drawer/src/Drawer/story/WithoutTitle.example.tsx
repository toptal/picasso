import { Button, Typography, Container, Drawer } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso/utils'
import React, { useState } from 'react'

const Example = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button data-testid='trigger' onClick={() => setOpen(!open)}>
        Show drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Container data-testid='content' padded={SPACING_4}>
          <Typography>This is the content. The title is omitted.</Typography>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
