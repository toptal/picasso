import React from 'react'
import 'happo-plugin-storybook/register'

import Picasso, { PicassoV5 } from '@toptal/picasso-provider'

export const parameters = {
  layout: 'padded',
  a11y: {
    element: '.component-section-container'
  }
}

const loadFonts = TEST_ENV !== 'visual'
const withPicasso = Story => (
  <Picasso loadFonts={loadFonts} fixViewport={false} loadFavicon={false}>
    <Story />
  </Picasso>
)

const withPicassoV5 = (Story, context) => {
  return (
    <PicassoV5>
      <Story {...context} />
    </PicassoV5>
  )
}

export const decorators = [withPicasso, withPicassoV5]
