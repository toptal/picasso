import React, { ReactNode } from 'react'
/* eslint-disable-next-line */
import {
  render,
  fireEvent,
  cleanup,
  RenderResult
} from '@testing-library/react'

import { OmitInternalProps } from '../Picasso'
import SidebarItem, { Props } from './SidebarItem'

const renderSidebarItem = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const {
    /* add props you need */
  } = props

  return render(<SidebarItem>{children}</SidebarItem>)
}

afterEach(cleanup)

describe('SidebarItem', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderSidebarItem(null, {})
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
