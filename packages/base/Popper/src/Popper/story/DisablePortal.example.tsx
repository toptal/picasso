import React, { useState } from 'react'
import { Button, Container, Typography, Popper } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(open ? null : event.currentTarget)
  }

  return (
    <Container>
      <Typography variant='body'>
        The box below has <code>overflow: hidden</code>. With{' '}
        <code>disablePortal</code> the Popper renders inline and gets clipped.
        Without it, the Popper escapes to the document root via a portal.
      </Typography>
      <div className='overflow-hidden h-[60px] mt-4 border-2 border-dashed border-gray-400 rounded-sm flex items-center px-4'>
        <Button onClick={handleClick}>Toggle Popper</Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement='bottom-start'
          disablePortal
        >
          <Container
            top={SPACING_4}
            bottom={SPACING_4}
            left={SPACING_4}
            right={SPACING_4}
            className='bg-white border border-gray-400 rounded-sm'
          >
            Clipped by overflow: hidden
          </Container>
        </Popper>
      </div>
    </Container>
  )
}

export default Example
