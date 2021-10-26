import React from 'react'
import { render } from '@toptal/picasso/test-utils'

import NonNativeSelectOptions, { Props } from './NonNativeSelectOptions'
import noop from '../utils/noop'

const OPTIONS = [
  { text: 'One', value: '1' },
  { text: 'Two', value: '2' },
  { text: 'Three', value: '3' }
]

const OPTION_GROUPS = {
  'Group 1': [
    { text: 'One', value: '1' },
    { text: 'Two', value: '2' },
    { text: 'Three', value: '3' }
  ],
  'Group 2': [
    { text: 'Four', value: '4' },
    { text: 'Five', value: '5' }
  ]
}

const defaultGetItemProps = () => ({
  onMouseDown: noop,
  onMouseEnter: noop,
  onClick: noop
})

const renderNonNativeSelectOptions = ({
  options = OPTIONS,
  selection = {
    isSelected: jest.fn(),
    isOptionSelected: jest.fn(),
    display: jest.fn()
  },
  multiple,
  size,
  noOptionsText,
  renderOption,
  highlightedIndex = null,
  filterOptionsValue = '',
  getItemProps = defaultGetItemProps,
  onBlur,
  fixedHeader,
  fixedFooter,
  testIds
}: Partial<Props> = {}) =>
  render(
    <NonNativeSelectOptions
      options={options}
      selection={selection}
      multiple={multiple}
      size={size}
      noOptionsText={noOptionsText}
      renderOption={renderOption}
      highlightedIndex={highlightedIndex}
      filterOptionsValue={filterOptionsValue}
      getItemProps={getItemProps}
      onBlur={onBlur}
      fixedHeader={fixedHeader}
      fixedFooter={fixedFooter}
      testIds={testIds}
    />
  )

describe('NonNativeSelectOptions', () => {
  it('renders', () => {
    const { container } = renderNonNativeSelectOptions()

    expect(container).toMatchSnapshot()
  })

  it('renders option groups', () => {
    const { container } = renderNonNativeSelectOptions({
      options: OPTION_GROUPS
    })

    expect(container).toMatchSnapshot()
  })

  it('renders no option', () => {
    const { container, getByTestId } = renderNonNativeSelectOptions({
      options: [],
      filterOptionsValue: 'search query',
      testIds: { noOptions: 'no-options' }
    })

    expect(getByTestId('no-options')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })
})
