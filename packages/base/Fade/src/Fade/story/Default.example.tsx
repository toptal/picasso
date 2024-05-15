import { Container, Button } from '@toptal/picasso'
import { Fade } from '@toptal/picasso-fade'
import React, { useState } from 'react'

const Example = () => {
  const [faded, setFaded] = useState(false)

  const handleOnClick = () => setFaded(prevFaded => !prevFaded)

  return (
    <Container>
      <Button onClick={handleOnClick} className='mb-4'>
        Toggle Fade
      </Button>
      <Fade in={faded} timeout={350}>
        <div className='bg-gray-100 p-4 rounded-md'>Fade in content</div>
      </Fade>
    </Container>
  )
}

export default Example
