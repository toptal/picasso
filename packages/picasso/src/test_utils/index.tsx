import React, { ReactElement } from 'react'
import {
  render as rtlRender,
  RenderOptions,
  RenderResult
} from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

const render = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => {
  return rtlRender(
    <Picasso loadFavicon={false} loadFonts={false} fixViewport={false}>
      {ui}
    </Picasso>,
    options
  )
}

export * from '@testing-library/react'
export { render }
