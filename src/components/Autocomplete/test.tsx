import React, { ReactNode } from 'react'
import { render, fireEvent, cleanup, RenderResult } from 'react-testing-library'

import Picasso, { OmitInternalProps } from '../Picasso'
import Autocomplete, { Props } from './Autocomplete'

const suggestions = [
  { label: 'Belarus' },
  { label: 'Croatia' },
  { label: 'Lithuania' },
  { label: 'Slovakia' },
  { label: 'Ukraine' }
]

const renderAutocomplete = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { placeholder, suggestions } = props

  return render(
    <Picasso loadFonts={false}>
      <Autocomplete placeholder={placeholder} suggestions={suggestions}>
        {children}
      </Autocomplete>
    </Picasso>
  )
}

afterEach(cleanup)

describe('Autocomplete', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderAutocomplete(null, {
      placeholder: 'Start typing here...',
      suggestions
    })
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })
  test('render suggestions when start typing', () => {
    const input = api.getByPlaceholderText('Start typing here...')

    // should show only Croatia and Lithuania
    fireEvent.change(input, { target: { value: 't' } })

    const { container } = api

    expect(container).toMatchSnapshot()
  })
})
