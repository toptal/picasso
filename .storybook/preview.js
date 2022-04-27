import React from 'react'
import 'happo-plugin-storybook/register'
import { ThemeProvider } from '@mui/material/styles'
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming'

import Picasso, { PicassoProvider } from '@toptal/picasso-provider'

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

const withThemeProvider = (Story, context) => {
  return (
    <Emotion10ThemeProvider theme={PicassoProvider.theme}>
      <ThemeProvider theme={PicassoProvider.theme}>
        <Story {...context} />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  )
}

export const decorators = [withPicasso, withThemeProvider]
