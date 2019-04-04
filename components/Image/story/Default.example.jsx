import React from 'react'
import { Image } from '@toptal/picasso'

const ImageDefaultExample = () => (
  <div>
    <Image
      src='https://uploads4.wikiart.org/images/pablo-picasso/jacqueline-with-flowers-1954.jpg!Large.jpg'
      alt='Not square default image'
      style={{ width: '250px', height: '307px' }}
    />
  </div>
)

export default ImageDefaultExample
