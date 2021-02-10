import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import NativeSelectOptions, { Props } from './NativeSelectOptions'
import noop from '../utils/noop'

const OPTIONS = [
  { text: 'One', value: '1' },
  { text: 'Two', value: '2' },
  { text: 'Three', value: '3' }
]

const defaultGetItemProps = () => ({
  role: 'option',
  'aria-selected': false,
  onMouseDown: noop,
  onMouseEnter: noop,
  onClick: noop
})

const renderNativeSelectOptions = ({
  options = OPTIONS,
  renderOption = option => option.text,
  getItemProps = defaultGetItemProps
}: Partial<Props<string>> = {}) =>
  render(
    <NativeSelectOptions
      options={options}
      renderOption={renderOption}
      getItemProps={getItemProps}
    />
  )

describe('NativeSelectOptions', () => {
  it('renders', () => {
    const { container } = renderNativeSelectOptions()

    expect(container).toMatchSnapshot()
  })
})
