import React, { ReactNode } from 'react'

import {
  isOptionsType,
  Option,
  OptionGroups,
  ItemProps,
  Selection
} from '../Select'

export interface Props {
  options: Option[] | OptionGroups
  selection: Selection
  renderOption: (option: Option, index: number) => ReactNode
  getItemProps: (option: Option, index: number) => ItemProps
}

const renderOptions = ({
  options,
  getItemProps,
  renderOption,
  selection
}: Pick<Props, 'getItemProps' | 'renderOption' | 'selection'> & {
  options: Option[]
}) => {
  return (
    <>
      {options.map((option, index) => (
        <option
          key={(option?.key ?? option.value).toString()}
          value={option.value.toString()}
          aria-selected={
            // aria-selected should be undefined for non-selectable options
            option.disabled ? undefined : selection.isOptionSelected(option)
          }
          disabled={option.disabled}
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
  selection
}: Props) => {
  if (isOptionsType(options)) {
    return renderOptions({ options, getItemProps, renderOption, selection })
  }

  return (
    <>
      {Object.keys(options).map(group => (
        <optgroup key={group} label={group}>
          {renderOptions({
            options: options[group],
            getItemProps,
            renderOption,
            selection
          })}
        </optgroup>
      ))}
    </>
  )
}

NativeSelectOptions.displayName = 'NativeSelectOptions'

export default NativeSelectOptions
