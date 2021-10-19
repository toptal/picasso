import React, { ReactNode } from 'react'

import { getSelection, isOptionsType } from '../Select'
import { Option, OptionGroups, ItemProps, ValueType } from '../Select/types'

export interface Props {
  options: Option[] | OptionGroups
  value?: ValueType | ValueType[]
  renderOption: (option: Option, index: number) => ReactNode
  getItemProps: (option: Option, index: number) => ItemProps
}

const renderOptions = ({
  options,
  getItemProps,
  renderOption,
  value
}: Pick<Props, 'getItemProps' | 'renderOption' | 'value'> & {
  options: Option[]
}) => {
  const selection = getSelection(options, value)

  return (
    <>
      {options.map((option, index) => (
        <option
          key={(option?.key ?? option.value).toString()}
          value={option.value.toString()}
          aria-selected={selection.isOptionSelected(option)}
          {...getItemProps(option, index)}
        >
          {renderOption(option, index)}
        </option>
      ))}
    </>
  )
}

const NativeSelectOptions = ({
  options,
  renderOption,
  getItemProps,
  value
}: Props) => {
  if (isOptionsType(options)) {
    return renderOptions({ options, getItemProps, renderOption, value })
  }

  return (
    <>
      {Object.keys(options).map(group => (
        <optgroup key={group} label={group}>
          {renderOptions({
            options: options[group],
            getItemProps,
            renderOption,
            value
          })}
        </optgroup>
      ))}
    </>
  )
}

NativeSelectOptions.displayName = 'NativeSelectOptions'

export default NativeSelectOptions
