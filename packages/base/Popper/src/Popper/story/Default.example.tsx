import React, { useState } from 'react'
import { Button, Container, Popper } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(open ? null : event.currentTarget)
  }

  return (
    <Container className='h-[120px]'>
      <Button onClick={handleClick}>Toggle Popper</Button>
      <Popper open={open} anchorEl={anchorEl} placement='bottom-start'>
        <Container
          top={SPACING_4}
          bottom={SPACING_4}
          left={SPACING_4}
          right={SPACING_4}
          className='bg-white border border-gray-400 rounded-sm'
        >
          Popper content
        </Container>
      </Popper>
    </Container>
  )
}

export default Example
