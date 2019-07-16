import React, { ReactNode } from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import { OmitInternalProps } from '../Picasso'
import TagSelector, { Props } from './TagSelector'

const renderTagSelector = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const {
    /* add props you need */
  } = props

  return render(<TagSelector>{children}</TagSelector>)
}

afterEach(cleanup)

describe('TagSelector', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTagSelector(null, {})
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
