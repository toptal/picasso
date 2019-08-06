import React, { ReactNode } from 'react'
/* eslint-disable-next-line */
import {
  render,
  fireEvent,
  cleanup,
  RenderResult
} from '@testing-library/react'

import { OmitInternalProps } from '../Picasso'
import Sidebar, { Props } from './Sidebar'

const renderSidebar = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const {
    /* add props you need */
  } = props

  return render(<Sidebar>{children}</Sidebar>)
}

afterEach(cleanup)

describe('Sidebar', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderSidebar(null, {})
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
