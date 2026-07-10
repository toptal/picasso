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
        disableScroll
        title='Drawer with disabled scroll'
        onClose={() => setOpen(false)}
      >
        <Container flex direction='column' className='flex-1 overflow-hidden'>
          <Container padded={SPACING_4}>
            <Typography>
              This header stays pinned while the content below scrolls.
            </Typography>
          </Container>
          <Container
            data-testid='content'
            padded={SPACING_4}
            className='flex-1 overflow-y-auto'
          >
            {Array.from(
              { length: 50 },
              (_, index) => `Scrollable line ${index + 1}`
            ).map(line => (
              <Typography key={line}>{line}</Typography>
            ))}
          </Container>
        </Container>
      </Drawer>
    </div>
  )
}

export default Example
