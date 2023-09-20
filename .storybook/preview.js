import React from 'react'
import 'github-markdown-css/github-markdown-light.css'
import 'happo-plugin-storybook/register'

import Picasso from '@toptal/picasso-provider'

export const parameters = {
  layout: 'padded',
  a11y: {
    element: '.component-section-container',
  },
}

const loadFonts = TEST_ENV !== 'visual'
const withPicasso = story => (
  <Picasso
    loadFonts={loadFonts}
    fixViewport={false}
    loadFavicon={false}
    preventPageWidthChangeOnScrollbar={false}
  >
    {story()}
  </Picasso>
)

export const decorators = [withPicasso]
