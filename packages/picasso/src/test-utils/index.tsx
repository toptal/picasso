import { ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'

import TestingPicasso from './TestingPicasso'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: TestingPicasso, ...options })

export * from '@testing-library/react'
export { customRender as render, TestingPicasso }
