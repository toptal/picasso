import React from 'react'
import 'github-markdown-css/github-markdown-light.css'
import 'happo-plugin-storybook/register'
import { getCheckpoints } from '../packages/picasso/src/test-utils/get-happo-targets/get-checkpoints.ts'
import './styles.css'

import Picasso from '@toptal/picasso-provider'

const baseViewportCheckpoints = getCheckpoints()
const BASE_VIEWPORTS = {
  'extra-small': {
    name: 'extra-small',
    styles: {
      height: '600px',
      width: baseViewportCheckpoints[0] + 'px',
    },
  },
  small: {
    name: 'small',
    styles: {
      height: '800px',
      width: baseViewportCheckpoints[1] + 'px',
    },
  },
  medium: {
    name: 'medium',
    styles: {
      height: '1000px',
      width: baseViewportCheckpoints[2] + 'px',
    },
  },
  large: {
    name: 'large',
    styles: {
      height: '1200px',
      width: baseViewportCheckpoints[3] + 'px',
    },
  },
  'extra-large': {
    name: 'extra-large',
    styles: {
      height: '1400px',
      // Add 200px of width, otherwise the difference with the previous breakpoint viewport is too small
      width: baseViewportCheckpoints[3] + 200 + 'px',
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
    injectFirst
  >
    {story()}
  </Picasso>
)

export const decorators = [withPicasso]
