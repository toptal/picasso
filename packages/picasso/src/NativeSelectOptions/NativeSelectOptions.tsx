import React, { ReactNode } from 'react'

import { isOptionsType } from '../Select'
import { Option, OptionGroups, ItemProps, ValueType } from '../Select/types'

export interface Props<T extends ValueType> {
  options: Option<T>[] | OptionGroups<T>
  renderOption: (option: Option<T>, index: number) => ReactNode
  getItemProps: (option: Option<T>, index: number) => ItemProps
}

const NativeSelectOptions = <T extends ValueType>({
  options,
  renderOption,
  getItemProps
}: Props<T>) => {
  const renderOptions = (optionsList: Option<T>[]) => (
    <>
      {optionsList.map((option, index) => (
        <option
          key={(option?.key ?? option.value).toString()}
          value={option.value.toString()}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getItemProps(option, index)}
        >
          {renderOption(option, index)}
        </option>
      ))}
    </>
  )

  if (isOptionsType(options)) {
    return renderOptions(options)
  }

  return (
    <>
      {Object.keys(options).map((group) => (
        <optgroup key={group} label={group}>
          {renderOptions(options[group])}
        </optgroup>
      ))}
    </>
  )
}

NativeSelectOptions.displayName = 'NativeSelectOptions'

export default NativeSelectOptions
