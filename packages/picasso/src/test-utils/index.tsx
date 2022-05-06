import React, { ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'

import TestingPicasso from './TestingPicasso'
import TestingPicassoV5 from './TestingPicassoV5'

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

const customRenderV5 = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
  picassoConfig?: PicassoConfig
): RenderResult => {
  const { rerender, ...rest } = render(
    <TestingPicasso titleCase={picassoConfig?.titleCase}>{ui}</TestingPicasso>,
    options
  )

  const customRerenderV5: typeof rerender = newUi =>
    rerender(
      <TestingPicassoV5 titleCase={picassoConfig?.titleCase}>
        {newUi}
      </TestingPicassoV5>
    )

  return { rerender: customRerenderV5, ...rest }
}

export * from '@testing-library/react'
export {
  customRender as render,
  customRenderV5 as renderV5,
  TestingPicasso,
  TestingPicassoV5
}
