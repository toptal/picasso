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
  onMouseDown: noop,
  onMouseEnter: noop,
  onClick: noop
})

const renderNativeSelectOptions = ({
  value,
  options = OPTIONS,
  renderOption = option => option.text,
  getItemProps = defaultGetItemProps
}: Partial<Props> = {}) =>
  render(
    <NativeSelectOptions
      value={value}
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
