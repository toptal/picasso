import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import NonNativeSelectOptions, { Props } from './NonNativeSelectOptions'
import noop from '../utils/noop'

const OPTIONS = [
  { text: 'One', value: '1' },
  { text: 'Two', value: '2' },
  { text: 'Three', value: '3' }
]

const defaultGetItemProps = () => ({
  role: 'option',
  'aria-selected': false,
  close: noop,
  onMouseDown: noop,
  onMouseEnter: noop,
  onItemSelect: noop,
  onClick: noop
})

const renderNonNativeSelectOptions = ({
  options = OPTIONS,
  value,
  multiple,
  size,
  noOptionsText,
  renderOption,
  highlightedIndex = null,
  filterOptionsValue = '',
  getItemProps = defaultGetItemProps,
  onBlur,
  fixedHeader
}: Partial<Props> = {}) =>
  render(
    <NonNativeSelectOptions
      options={options}
      value={value}
      multiple={multiple}
      size={size}
      noOptionsText={noOptionsText}
      renderOption={renderOption}
      highlightedIndex={highlightedIndex}
      filterOptionsValue={filterOptionsValue}
      getItemProps={getItemProps}
      onBlur={onBlur}
      fixedHeader={fixedHeader}
    />
  )

describe('NonNativeSelectOptions', () => {
  it('renders', () => {
    const { container } = renderNonNativeSelectOptions()

    expect(container).toMatchSnapshot()
  })

  it('renders no option', () => {
    const { container, getByTestId } = renderNonNativeSelectOptions({
      options: [],
      filterOptionsValue: 'search query'
    })

    expect(getByTestId('no-options')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
