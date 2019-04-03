import React from 'react'
import { Image, Container } from '@toptal/picasso'

const ImageVariantsExample = () => (
  <div>
    <Image
      src='https://uploads.toptal.io/user/photo/224370/large_e5ac43755fea47e2403fb5a04acaa59d.jpg'
      variant='rounded'
      style={{ width: '250px', height: '250px' }}
    />
    <Container top={2}>
      <Image
        src='https://uploads.toptal.io/user/photo/224370/large_e5ac43755fea47e2403fb5a04acaa59d.jpg'
        style={{ width: '250px', height: '250px' }}
      />
    </Container>
  </div>
)

export default ImageVariantsExample
