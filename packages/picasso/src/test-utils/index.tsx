import React, { ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import Picasso from '@toptal/picasso-shared'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => {
  return render(
    <Picasso loadFavicon={false} loadFonts={false} fixViewport={false}>
      {ui}
    </Picasso>,
    options
  )
}

export * from '@testing-library/react'
export { customRender as render }
