/* eslint-disable import/no-extraneous-dependencies */
import type { ReactElement } from 'react'
import React from 'react'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import { render } from '@testing-library/react'

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
export { HAPPO_TARGETS, getHappoTargets } from './get-happo-targets'
