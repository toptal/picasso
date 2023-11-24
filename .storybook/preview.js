import React from 'react'
import 'github-markdown-css/github-markdown-light.css'
import 'happo-plugin-storybook/register'

import Picasso from '@toptal/picasso-provider'

const BASE_VIEWPORTS = {
  'extra-small': {
    name: 'extra-small',
    styles: {
      height: '600px',
      width: '479px',
    },
  },
  small: {
    name: 'small',
    styles: {
      height: '800px',
      width: '767px',
    },
  },
  medium: {
    name: 'medium',
    styles: {
      height: '1000px',
      width: '1023px',
    },
  },
  large: {
    name: 'large',
    styles: {
      height: '1200px',
      width: '1439px',
    },
  },
  'extra-large': {
    name: 'extra-large',
    styles: {
      height: '1400px',
      width: '1600px',
    },
  },
}

export const parameters = {
  layout: 'padded',
  a11y: {
    element: '.component-section-container',
  },
  viewport: {
    viewports: BASE_VIEWPORTS,
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
