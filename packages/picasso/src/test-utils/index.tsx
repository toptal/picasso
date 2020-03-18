import React, { ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'

import TestingPicasso from './TestingPicasso'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => {
  return render(<TestingPicasso>{ui}</TestingPicasso>, options)
}

export { default as TestingPicasso } from './TestingPicasso'
export * from '@testing-library/react'
export { customRender as render }
