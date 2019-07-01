import React, { ReactNode } from 'react'
/* eslint-disable-next-line */
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import { OmitInternalProps } from '../Picasso'
import Autocomplete, { Props } from './Autocomplete'

const renderAutocomplete = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { placeholder } = props

  return render(
    <Autocomplete placeholder={placeholder}>{children}</Autocomplete>
  )
}

afterEach(cleanup)

describe('Autocomplete', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderAutocomplete(null, {
      placeholder: 'Start typing here...'
    })
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
