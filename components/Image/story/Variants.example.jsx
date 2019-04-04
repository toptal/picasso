import React from 'react'
import { Image, Container } from '@toptal/picasso'

const ImageVariantsExample = () => (
  <div>
    <Image
      src='https://uploads4.wikiart.org/images/pablo-picasso/jacqueline-with-flowers-1954.jpg!Large.jpg'
      alt='Default image'
      style={{ width: '250px', height: '250px', objectFit: 'cover' }}
    />
    <Container left={1} inline>
      <Image
        variant='circular'
        alt='Circular image'
        src='https://uploads4.wikiart.org/images/pablo-picasso/jacqueline-with-flowers-1954.jpg!Large.jpg'
        style={{ width: '250px', height: '250px', objectFit: 'cover' }}
      />
    </Container>
  </div>
)

export default ImageVariantsExample
