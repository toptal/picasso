import React from 'react'
import { Image, Container } from '@toptal/picasso'
import { SPACING_4 } from '@toptal/picasso-utils'

const Example = () => (
  <div>
    <Container inline>
      <Image
        src='./jacqueline-with-flowers-1954-square.jpg'
        alt='Default image'
        style={{ width: '250px', height: '250px' }}
      />
    </Container>
    <Container left={SPACING_4} inline>
      <Image
        variant='circular'
        alt='Circular image'
        src='./jacqueline-with-flowers-1954-square.jpg'
        style={{ width: '250px', height: '250px' }}
      />
    </Container>
  </div>
)

export default Example
