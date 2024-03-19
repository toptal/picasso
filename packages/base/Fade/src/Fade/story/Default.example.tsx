import { Container, Button } from '@toptal/picasso'
import { Fade } from '@toptal/picasso-fade'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Example = () => {
  const [faded, setFaded] = useState(false)

  const handleOnClick = () => setFaded(prevFaded => !prevFaded)

  return (
    <Container bottom={SPACING_4}>
      <Button onClick={handleOnClick}>Toggle Fade</Button>
      <Fade in={faded} timeout={3000}>
        <div className='bg-red-500 p-4'>Fade in</div>
      </Fade>
    </Container>
  )
}

export default Example
