import { Container, Button } from '@toptal/picasso'
import { Slide } from '@toptal/picasso-slide'
import { SPACING_4 } from '@toptal/picasso-utils'
import React, { useState } from 'react'

const Example = () => {
  const [slided, setSlided] = useState(false)

  const handleOnClick = () => setSlided(prevSlided => !prevSlided)

  return (
    <Container bottom={SPACING_4}>
      <Button onClick={handleOnClick}>Toggle Slide</Button>
      <Slide in={slided} timeout={3000} direction='right'>
        <div className='bg-red-500 p-4'>Slide in</div>
      </Slide>
    </Container>
  )
}

export default Example
