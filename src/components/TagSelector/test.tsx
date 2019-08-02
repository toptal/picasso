import React, { ReactNode } from 'react'
/* eslint-disable-next-line */
import {
  render,
  fireEvent,
  cleanup,
  RenderResult
} from '@testing-library/react'

import Picasso, { OmitInternalProps } from '../Picasso'
import TagSelector, { Props } from './TagSelector'

const options = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AI', label: 'Aland Islands' },
  { value: 'ALB', label: 'Albania' },
  { value: 'ALG', label: 'Algeria' }
]

const renderTagSelector = (
  children: ReactNode,
  props: OmitInternalProps<Props>
) => {
  const { loading, newOptionLabel, options, placeholder, value } = props

  return render(
    <Picasso loadFonts={false}>
      <TagSelector
        loading={loading}
        newOptionLabel={newOptionLabel}
        options={options}
        placeholder={placeholder}
        value={value}
      >
        {children}
      </TagSelector>
    </Picasso>
  )
}

afterEach(cleanup)

describe('TagSelector', () => {
  let api: RenderResult

  beforeEach(() => {
    api = renderTagSelector(null, {
      loading: false,
      newOptionLabel: 'Add: ',
      options,
      placeholder: 'Please select...',
      value: []
    })
  })
  test('default render', () => {
    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('renders available options when start typing', () => {
    const input = api.getByPlaceholderText('Please select...')

    fireEvent.change(input, { target: { value: 'Al' } })

    const { container } = api

    expect(container).toMatchSnapshot()
  })

  test('renders with preselected value', () => {
    const { container } = renderTagSelector(null, {
      loading: false,
      newOptionLabel: 'Add: ',
      options,
      placeholder: 'Please select...',
      value: ['AF']
    })

    expect(container).toMatchSnapshot()
  })
})
