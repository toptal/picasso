import React, { ReactNode } from 'react'
/* eslint-disable-next-line */
import {
  render,
  fireEvent,
  cleanup,
  RenderResult
} from '@testing-library/react'

import { OmitInternalProps } from '../Picasso'
import SidebarMenu, { Props } from './SidebarMenu'

const renderSidebarMenu = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const {
    /* add props you need */
  } = props

  return render(<SidebarMenu>{children}</SidebarMenu>)
}

afterEach(cleanup)

describe('SidebarMenu', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderSidebarMenu(null, {})
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
