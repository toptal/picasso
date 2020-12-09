import React from 'react'

import Picasso from '@toptal/picasso-shared'

export const parameters = { layout: 'padded' }

const loadFonts = TEST_ENV !== 'visual'
const withPicasso = story => (
  <Picasso loadFonts={loadFonts} fixViewport={false} loadFavicon={false}>
    {story()}
  </Picasso>
)

export const decorators = [withPicasso]
