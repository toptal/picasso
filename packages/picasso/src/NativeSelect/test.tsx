/* eslint-disable max-lines */

import React from 'react'
import { render, PicassoConfig } from '@toptal/picasso/test-utils'
import { OmitInternalProps } from '@toptal/picasso-shared'

import NativeSelect from './NativeSelect'
import { SelectProps } from '../Select'

const renderNativeSelect = (
  props: OmitInternalProps<SelectProps>,
  picassoConfig?: PicassoConfig
) => {
  const {
    options,
    value,
    width,
    placeholder,
    multiple = false,
    onChange = () => {},
    renderOption,
    getDisplayValue,
    ...rest
  } = props

  return render(
    <NativeSelect
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      options={options}
      renderOption={renderOption}
      getDisplayValue={getDisplayValue}
      value={value}
      width={width}
      placeholder={placeholder}
      multiple={multiple}
      onChange={onChange}
    />,
    undefined,
    picassoConfig
  )
}

const OPTIONS = [
  {
    key: 1,
    value: 'val1',
    text: 'text1'
  },
  {
    key: 2,
    value: 'val2',
    text: 'text2'
  },
  {
    key: 3,
    value: 'val3',
    text: 'text3'
  }
]

describe('NativeSelect', () => {
  it('renders native select', () => {
    const { container, getByText } = renderNativeSelect({
      options: OPTIONS,
      placeholder: 'Choose an option...',
      value: 'val1'
    })

    const emptyOption = getByText('Choose an option...')

    expect(emptyOption).toBeDisabled()

    expect(container).toMatchSnapshot()
  })

  it('renders native select with the empty option enabled when enableReset is `true`', () => {
    const { container, getByText } = renderNativeSelect({
      enableReset: true,
      options: OPTIONS,
      placeholder: 'Choose an option...',
      value: 'val1'
    })

    const emptyOption = getByText('Choose an option...')

    expect(emptyOption).not.toBeDisabled()

    expect(container).toMatchSnapshot()
  })
})
