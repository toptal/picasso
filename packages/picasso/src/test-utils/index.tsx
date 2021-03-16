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
): RenderResult => {
  const { rerender, ...rest } = render(
    <TestingPicasso titleCase={picassoConfig?.titleCase}>{ui}</TestingPicasso>,
    options
  )

  const customRerender: typeof rerender = newUi =>
    rerender(
      <TestingPicasso titleCase={picassoConfig?.titleCase}>
        {newUi}
      </TestingPicasso>
    )

  return { rerender: customRerender, ...rest }
}

export * from '@testing-library/react'
export { customRender as render, TestingPicasso }
