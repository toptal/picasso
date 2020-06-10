import React, { ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'

import TestingPicasso from './TestingPicasso'

export type PicassoConfig = {
  titleCase: boolean
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
  picassoConfig?: PicassoConfig
): RenderResult =>
  render(
    <TestingPicasso titleCase={picassoConfig?.titleCase}>{ui}</TestingPicasso>,
    options
  )

export * from '@testing-library/react'
export { customRender as render, TestingPicasso }
