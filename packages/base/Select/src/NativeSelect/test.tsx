/* eslint-disable max-lines */

import React from 'react'
import type { PicassoConfig } from '@toptal/picasso-test-utils'
import { render } from '@toptal/picasso-test-utils'
import type { OmitInternalProps } from '@toptal/picasso-shared'

import { NativeSelect } from './NativeSelect'
import type { SelectProps } from '../SelectBase'

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
    text: 'text1',
  },
  {
    key: 2,
    value: 'val2',
    text: 'text2',
  },
  {
    key: 3,
    value: 'val3',
    text: 'text3',
  },
]

describe('NativeSelect', () => {
  it('renders native select', () => {
    const { container, getByText } = renderNativeSelect({
      options: OPTIONS,
      placeholder: 'Choose an option...',
      value: 'val1',
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
      value: 'val1',
    })

    const emptyOption = getByText('Choose an option...')

    expect(emptyOption).not.toBeDisabled()

    expect(container).toMatchSnapshot()
  })

  describe('empty option', () => {
    it('is dropped when a value is selected and there is no placeholder', () => {
      const { getAllByRole } = renderNativeSelect({
        options: OPTIONS,
        value: 'val1',
      })

      expect(getAllByRole('option')).toHaveLength(OPTIONS.length)
    })

    it('is kept while nothing is selected', () => {
      const { getAllByRole } = renderNativeSelect({ options: OPTIONS })

      expect(getAllByRole('option')).toHaveLength(OPTIONS.length + 1)
    })

    it('is kept and enabled by enableReset without a placeholder', () => {
      const { getAllByRole } = renderNativeSelect({
        enableReset: true,
        options: OPTIONS,
        value: 'val1',
      })

      const [emptyOption] = getAllByRole('option')

      expect(getAllByRole('option')).toHaveLength(OPTIONS.length + 1)
      expect(emptyOption).not.toBeDisabled()
    })
  })

  describe('inset', () => {
    it('follows size and reserves the caret', () => {
      const { getByRole } = renderNativeSelect({
        options: OPTIONS,
        size: 'small',
      })

      expect(getByRole('combobox')).toHaveClass(
        'py-1 pl-[0.625rem] pr-[1.625rem]'
      )
    })

    it('reserves the end adornment instead of the caret', () => {
      const { getByRole } = renderNativeSelect({
        options: OPTIONS,
        icon: <span />,
        iconPosition: 'end',
      })

      const select = getByRole('combobox')

      expect(select).toHaveClass('pr-[3.5625rem]')
      expect(select).not.toHaveClass('pr-[1.625rem]')
    })
  })
})
