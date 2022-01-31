import { Button, Typography, Container, Drawer } from '@toptal/picasso'
import React, { useState } from 'react'

const Example = () => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Button data-testid='trigger' onClick={() => setOpen(!open)}>
        Show drawer
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Container data-testid='content' padded='small'>
          <Typography>This is the content. The title is omitted.</Typography>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
