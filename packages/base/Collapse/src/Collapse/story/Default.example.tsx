import { Container, Button } from '@toptal/picasso'
import { Collapse } from '@toptal/picasso-collapse'
import React, { useState } from 'react'

const Example = () => {
  const [faded, setFaded] = useState(false)

  const handleOnClick = () => setFaded(prevFaded => !prevFaded)

  return (
    <Container>
      <Button onClick={handleOnClick} className='mb-4'>
        Toggle Collapse
      </Button>
      <Collapse in={faded} timeout={400}>
        <div className='bg-gray-100 p-4 rounded-md'>Collapse content</div>
      </Collapse>
    </Container>
  )
}

export default Example
