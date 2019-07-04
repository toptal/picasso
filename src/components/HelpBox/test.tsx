import React, { ReactNode } from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import { OmitInternalProps } from '../Picasso'
import HelpBox, { Props } from './HelpBox'

const renderHelpBox = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const {
    /* add props you need */
  } = props

  return render(<HelpBox>{children}</HelpBox>)
}

afterEach(cleanup)

describe('HelpBox', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderHelpBox(null, {})
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
