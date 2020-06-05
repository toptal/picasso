import React, { ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { PicassoDefaultProps } from '@toptal/picasso-shared'

import TestingPicasso from './TestingPicasso'

export type PicassoConfig = {
  titleCase: boolean
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
  defaultProps?: PicassoDefaultProps
): RenderResult =>
  render(
    <TestingPicasso defaultProps={defaultProps}>{ui}</TestingPicasso>,
    options
  )

export * from '@testing-library/react'
export { customRender as render, TestingPicasso }
